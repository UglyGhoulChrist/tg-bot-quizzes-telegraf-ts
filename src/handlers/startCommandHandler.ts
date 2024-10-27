import { Context } from "telegraf";
import { messageNotFinish, messageStart } from "../constants";
import { appendLog } from "../loggers/appendLog";
import { getUserState } from "../states/userStates";
import { appendError } from "../loggers/appendError";
import { getLastCommand, setLastCommand } from "../states/botStates";
import { deleteMessageAfterDelay } from "../utils/deleteMessageAfterDelay";

export async function startCommandHandler(ctx: Context): Promise<void> {
    const userId: number | undefined = ctx.from?.id;
    const idLastCommand: number | undefined = ctx.message?.message_id;

    try {
        if (getLastCommand() === "/start" && idLastCommand) {
            await deleteMessageAfterDelay(ctx, idLastCommand, 2000);
            return;
        }
        setLastCommand("/start");
        if (!userId) {
            await appendLog("Объект from в контексте не найден.");
            return;
        }
        if (getUserState(userId)) {
            await ctx.reply(messageNotFinish);
        } else {
            await ctx.reply(messageStart);
        }
    } catch (error) {
        appendError(error as NodeJS.ErrnoException);
    }
}
