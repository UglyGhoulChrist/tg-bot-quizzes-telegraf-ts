import { Context } from "telegraf";
import { messageBadCommand } from "../constants";
import { appendError } from "../loggers/appendError";
import { askQuestionGptAsync } from "../ai/askQuestionGptAsync";
import dotenv from "dotenv";
import { appendConversations } from "../loggers/appendConversations";

dotenv.config();

export async function messageHandler(ctx: Context) {
    try {
        // ! Начало кода отправки вопроса к Yandex Async GPT
        const id: number | undefined = ctx.message?.from?.id;
        const name: string | undefined = ctx.message?.from?.first_name;

        if (
            // ! TODO: Добавить проверку на id
            // id === Number(process.env.DEVELOPER_ID) &&
            ctx.message &&
            "text" in ctx.message
        ) {
            if (id) appendConversations(id, name, ctx.message.text);

            await ctx.reply("Ответ скоро будет...");
            const responseAi: string = await askQuestionGptAsync(
                ctx.message.text,
            );
            if (id) appendConversations(id, "Yandex GPT", responseAi);

            await ctx.reply(`Yandex GPT: ${responseAi}`);
            return;
        }

        // ! Конец кода отправки вопроса к Yandex Async GPT

        // await ctx.deleteMessage(ctx.message.message_id)
        await ctx.reply(messageBadCommand);
    } catch (error) {
        appendError(error as NodeJS.ErrnoException);
    }
}
