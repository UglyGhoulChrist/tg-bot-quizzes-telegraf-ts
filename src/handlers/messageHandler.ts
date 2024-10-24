import { Context } from "telegraf";
import { messageBadCommand } from "../constants";
import { appendError } from "../loggers/appendError";

export async function messageHandler(ctx: Context) {
    try {
        await ctx.reply(messageBadCommand);
    } catch (error) {
        appendError(error as NodeJS.ErrnoException);
    }
}
