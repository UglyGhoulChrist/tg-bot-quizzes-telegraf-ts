import { Context } from "telegraf";
import { messageBadCommand } from "../constants";
import { appendError } from "../loggers/appendError";
import { askQuestionGptAsync } from "../ai/askQuestionGptAsync";
import dotenv from "dotenv";

dotenv.config();

export async function messageHandler(ctx: Context) {
    try {
        // ! Начало кода отправки вопроса к Yandex Async GPT
        const id: number | undefined = ctx.message?.from?.id;

        if (
            id === Number(process.env.DEVELOPER_ID) && ctx.message &&
            "text" in ctx.message
        ) {
            await ctx.reply("Ответ скоро будет...");
            const responseAi: string = await askQuestionGptAsync(
                ctx.message.text,
            );
            await ctx.reply(responseAi);
            return;
        }

        // ! Конец кода отправки вопроса к Yandex Async GPT

        // await ctx.deleteMessage(ctx.message.message_id)
        await ctx.reply(messageBadCommand);
    } catch (error) {
        appendError(error as NodeJS.ErrnoException);
    }
}
