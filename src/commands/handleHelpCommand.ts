import { Context } from 'telegraf'
import { messageHelp } from '../constants'
import { appendErr } from '../loggers/appendErr'

export async function handleHelpCommand(ctx: Context) {
    try {
        await ctx.replyWithHTML(messageHelp, { parse_mode: 'HTML' })
    } catch (error) {
        appendErr(error as NodeJS.ErrnoException)
    }
}
