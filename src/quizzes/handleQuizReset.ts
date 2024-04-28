import { Context } from 'telegraf'
import { messageReset } from '../constants'
import { appendLog } from '../loggers/appendLog'
import { resetUserState } from '../state/userStates'
import { appendErr } from '../loggers/appendErr';

export async function handleResetCommand(ctx: Context): Promise<void> {
    const userId: number | undefined = ctx.from?.id;

    if (userId) {
        resetUserState(userId);
        try {
            await ctx.reply(messageReset);
        } catch (error) {
            appendErr(error as NodeJS.ErrnoException)
        }
    } else {
        appendLog('Объект from в контексте не найден.');
    }
}
