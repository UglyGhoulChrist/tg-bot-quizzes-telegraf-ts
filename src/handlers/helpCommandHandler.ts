import { Context } from 'telegraf'
import { messageHelp } from '../constants'
import { appendError } from '../loggers/appendError'

export async function helpCommandHandler(ctx: Context) {
    try {
        await ctx.replyWithHTML(messageHelp, { parse_mode: 'HTML' })
    } catch (error) {
        appendError(error as NodeJS.ErrnoException)
    }
}
