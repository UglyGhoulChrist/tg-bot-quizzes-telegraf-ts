import { Context, Telegraf } from "telegraf";
import { getUserState, resetUserState } from "../state/userStates";
import { sendCompletion } from "./sendCompletion";
import { appendQuizResult } from "../loggers/appendQuizResult";

// Функция для обработки завершения викторины
export async function handleQuizCompletion(bot: Telegraf<Context>, userId: number, userFirstName: string) {
    const userState = getUserState(userId);
    if (userState.currentQuestion >= userState.lengthQuiz) {
        const chatId = userState.chatId;
        await sendCompletion(bot, chatId, userId, userState, userFirstName);

        // Запись результатов викторины
        const quizResult = {
            name: userFirstName,
            userId,
            category: userState.categoryQuiz,
            lengthQuiz: userState.lengthQuiz,
            correctAnswers: userState.correctAnswers,
        };
        appendQuizResult(quizResult);

        // Сброс состояния пользователя
        resetUserState(userId);
    }
}