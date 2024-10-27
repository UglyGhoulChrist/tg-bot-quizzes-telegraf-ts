import { Context } from "telegraf";
import { messageHelp } from "../constants";
import { appendError } from "../loggers/appendError";
import { getLastCommand, setLastCommand } from "../states/botStates";
import { deleteMessageAfterDelay } from "../utils/deleteMessageAfterDelay";

export async function helpCommandHandler(ctx: Context): Promise<void> {
    const idLastCommand: number | undefined = ctx.message?.message_id;

    try {
        if (getLastCommand() === "/help" && idLastCommand) {
            await deleteMessageAfterDelay(ctx, idLastCommand, 2000);
            return;
        }

        setLastCommand("/help");
        await ctx.replyWithHTML(messageHelp, { parse_mode: "HTML" });
    } catch (error) {
        appendError(error as NodeJS.ErrnoException);
    }
}
