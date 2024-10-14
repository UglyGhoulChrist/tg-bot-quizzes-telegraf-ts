import { Context, Telegraf } from "telegraf";
import { getUserState } from "../states/userStates";
import { IUserState } from "../states/interface.userState";
import { appendError } from "../loggers/appendError";

export async function completionSender(bot: Telegraf<Context>, userId: number) {
    const userState: IUserState = getUserState(userId);
    const chatId: number = userState.chatId;

    // Отправка сообщения окончания викторины
    try {
        await bot.telegram.sendMessage(
            chatId,
            `Ура! Ты прошёл всю викторину и ответил на ${userState.lengthListQuestions} вопросов!
Твой результат: ${userState.counterCorrectAnswers} правильных ответов. Ты молодец!
Хочешь улучшить свой результат? Нажми /start и попробуй снова! 🏆`,
        );
    } catch (error) {
        appendError(error as NodeJS.ErrnoException);
    }
}
