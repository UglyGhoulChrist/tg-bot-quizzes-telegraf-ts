import { Context } from 'telegraf'
import { messageNotFinish, messageStart } from '../constants'
import { appendLog } from '../loggers/appendLog'
import { getUserState } from '../state/userStates'
import { appendErr } from '../loggers/appendErr'

export async function handleStartCommand(ctx: Context) {
    const userId = ctx.from?.id;

    if (!userId) {
        await appendLog('Объект from в контексте не найден.');
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
        appendErr(error as NodeJS.ErrnoException);
    }
}
