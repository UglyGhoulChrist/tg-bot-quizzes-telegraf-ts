import { Context, Telegraf } from "telegraf";
import { getUserState, resetUserState } from "../states/userStates";
import { completionSender } from "../senders/completionSender";
import { appendQuizResult } from "../loggers/appendQuizResult";
import { IQuizResult } from "../loggers/interface.quizResult";
import { IUserState } from "../states/interface.userState";

// Функция для обработки завершения викторины
export async function quizCompletionHandler(bot: Telegraf<Context>, userId: number) {
    const userState: IUserState = getUserState(userId);
    const userName: string = userState.userName

    await completionSender(bot, userId);

    const quizResult: IQuizResult = {
        userName,
        userId,
        currentCategory: userState.currentCategory,
        lengthListQuestions: userState.lengthListQuestions,
        counterCorrectAnswers: userState.counterCorrectAnswers,
    };
    // Запись результатов викторины
    await appendQuizResult(quizResult);

    // Сброс состояния пользователя
    await resetUserState(userId);
}