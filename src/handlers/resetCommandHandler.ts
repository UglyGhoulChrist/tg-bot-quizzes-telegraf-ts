import { Context } from "telegraf";
import { messageReset } from "../constants";
import { appendLog } from "../loggers/appendLog";
import { resetUserState } from "../states/userStates";
import { appendError } from "../loggers/appendError";
import { getLastCommand, setLastCommand } from "../states/botStates";
import { deleteMessageAfterDelay } from "../utils/deleteMessageAfterDelay";

export async function resetCommandHandler(ctx: Context): Promise<void> {
    const userId: number | undefined = ctx.from?.id;
    const idLastCommand: number | undefined = ctx.message?.message_id;
    try {
        if (getLastCommand() === "/reset" && idLastCommand) {
            await deleteMessageAfterDelay(ctx, idLastCommand, 2000);
            return;
        }
        setLastCommand("/reset");
        if (userId) {
            resetUserState(userId);
            await ctx.reply(messageReset);
            return;
        }
        appendLog("Объект from в контексте не найден.");
    } catch (error) {
        appendError(error as NodeJS.ErrnoException);
    }
}
