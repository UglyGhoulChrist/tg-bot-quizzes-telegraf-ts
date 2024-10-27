import { Context } from "telegraf";
import { appendError } from "../loggers/appendError";

export async function deleteMessageAfterDelay(
    ctx: Context,
    messageId: number,
    delay: number,
) {
    return new Promise<void>((resolve) => {
        setTimeout(async () => {
            try {
                await ctx.deleteMessage(messageId);
            } catch (error) {
                appendError(error as NodeJS.ErrnoException);
            }
            resolve();
        }, delay);
    });
}
