import { Context } from "telegraf";
import { messageBadCommand } from "../constants";
import { appendError } from "../loggers/appendError";
import { deleteMessageAfterDelay } from "../utils/deleteMessageAfterDelay";

export async function messageHandler(ctx: Context): Promise<void> {
    const idLastMessage: number | undefined = ctx.message?.message_id;

    if (!idLastMessage) return; // Выход, если нет ID последнего сообщения

    try {
        // Удаляем предыдущее сообщение через 2 секунды
        await deleteMessageAfterDelay(ctx, idLastMessage, 2000);

        // Отправляем новое сообщение
        const mostRecentMessage = await ctx.replyWithHTML(messageBadCommand, {
            parse_mode: "HTML",
        });
        const idMostRecentMessage = mostRecentMessage.message_id;

        // Удаляем новое сообщение через 5 секунд
        await deleteMessageAfterDelay(ctx, idMostRecentMessage, 5000);
    } catch (error) {
        appendError(error as NodeJS.ErrnoException);
    }
}
