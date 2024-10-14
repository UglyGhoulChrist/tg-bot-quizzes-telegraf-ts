import { Context } from "telegraf";
import { messageNotFinish, messageStart } from "../constants";
import { appendLog } from "../loggers/appendLog";
import { getUserState } from "../states/userStates";
import { appendError } from "../loggers/appendError";

export async function startCommandHandler(ctx: Context): Promise<void> {
    const userId = ctx.from?.id;

    if (!userId) {
        await appendLog("Объект from в контексте не найден.");
        return;
    }

    if (getUserState(userId)) {
        await safeReply(ctx, messageNotFinish);
    } else {
        await safeReply(ctx, messageStart);
    }
}

async function safeReply(ctx: Context, message: string) {
    try {
        await ctx.reply(message);
    } catch (error) {
        appendError(error as NodeJS.ErrnoException);
    }
}
