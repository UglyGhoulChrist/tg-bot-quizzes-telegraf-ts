import { Context } from "telegraf";
import { messageBadCommand } from "../constants";
import { appendError } from "../loggers/appendError";
// import { fetchAIResponseGptAsync } from "../ai/fetchAIResponseGptAsync";
import { appendConversations } from "../loggers/appendConversations";

export async function messageHandler(ctx: Context) {
    try {
        // ! Начало кода отправки вопроса к Yandex Async GPT
        const id: number | undefined = ctx.message?.from?.id;
        const name: string | undefined = ctx.message?.from?.first_name;

        if (ctx.message && "text" in ctx.message && id) {
            // Запись в лог сообщений от пользователя
            appendConversations(id, name, ctx.message.text);
            // Отправляем сообщение и сохраняем его ID
            const sentMessage = await ctx.reply("Ответ скоро будет...");
            // Получаем ID сообщения
            const messageId = sentMessage.message_id;

            // !! Запрос через код этого проекта. Начало
            // const responseAi: string = await fetchAIResponseGptAsync(
            //     id,
            //     ctx.message.text,
            // );
            // Запись в лог сообщений от Yandex Async GPT
            // appendConversations(id, "Yandex GPT", responseAi);
            // await ctx.reply(`Yandex GPT: ${responseAi}`);
            // return;
            // !! Запрос через код этого проекта. Конец

            // !! Запрос Container App Sber Cloud.ru. Начало
            const responseAiSber: Response = await fetch(
                "https://container-yandex-ai-docker-express-ts.containers.cloud.ru/api/gpt/async",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id, message: ctx.message.text }),
                },
            );
            const responseAiSberJson: { id: number; message: string } =
                await responseAiSber.json() as { id: number; message: string };
            const responseAi: string = responseAiSberJson.message;
            // !! Запрос Container App Sber Cloud.ru. Конец

            // Запись в лог сообщений от Yandex Async GPT
            appendConversations(
                id,
                "Yandex GPT + Container App Sber",
                responseAi,
            );
            // Удаляем сообщение
            await ctx.deleteMessage(messageId);
            await ctx.replyWithHTML(
                `<b>Yandex GPT + Container App Sber</b>:\n\n${responseAi}`,
            );
            return;
        }
        // ! Конец кода отправки вопроса к Yandex Async GPT

        await ctx.reply(messageBadCommand);
    } catch (error) {
        appendError(error as NodeJS.ErrnoException);
    }
}
