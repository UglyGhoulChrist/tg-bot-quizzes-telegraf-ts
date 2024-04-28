import { Context } from "telegraf"
import { messageBadCommand } from "../constants"
import { appendErr } from "../loggers/appendErr"

export async function handleMessage(ctx: Context) {

    try {
        // await ctx.deleteMessage(ctx.message.message_id)
        await ctx.reply(messageBadCommand)
    } catch (error) {
        appendErr(error as NodeJS.ErrnoException)
    }
}