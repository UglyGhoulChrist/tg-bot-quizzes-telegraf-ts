import { Context, Telegraf } from "telegraf";
import { getUserState, resetUserState } from "../state/userStates";
import { sendCompletion } from "./sendCompletion";
import { appendQuizResult } from "../loggers/appendQuizResult";

// Функция для обработки завершения викторины
export async function handleQuizCompletion(bot: Telegraf<Context>, userId: number) {
    const userState = getUserState(userId);
    const firstName: string = userState.firstName
    if (userState.currentQuestion >= userState.lengthQuiz) {

        await sendCompletion(bot, userId);

        // Запись результатов викторины
        const quizResult = {
            name: firstName,
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