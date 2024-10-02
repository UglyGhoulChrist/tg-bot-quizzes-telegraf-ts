import { Context } from "telegraf";
import { messageBadCommand } from "../constants";
import { appendError } from "../loggers/appendError";
import { fetchAIResponse } from "../ai/fetchAIResponse";

export async function messageHandler(ctx: Context) {
    try {
        if (ctx.text) {
            await ctx.reply("Нужно немного подождать...");
            const response: string = await fetchAIResponse(ctx.text);
            await ctx.reply(response);
        } else {
            await ctx.reply(messageBadCommand);
        }
    } catch (error) {
        appendError(error as NodeJS.ErrnoException);
    }
}
