import { Context, Telegraf } from "telegraf";
import { resetUserState } from '../state/userStates';
import { IUserState } from "../state/interface.userState";
import { appendQuizResult } from "../loggers/appendQuizResult";
import { IQuizResult } from "../loggers/interface.quizRezult";
import { appendErr } from "../loggers/appendErr";

export async function sendCompletion(bot: Telegraf<Context>, chatId: number, userId: number, userState: IUserState, userFirstName: string) {
    // Отправка сообщения окончания викторины
    try {
        await bot.telegram.sendMessage(chatId, `Ура! Ты прошёл всю викторину и ответил на ${userState.lengthQuiz} вопросов!
Твой результат: ${userState.correctAnswers} правильных ответов. Ты молодец!
Хочешь улучшить свой результат? Нажми /start и попробуй снова! 🏆`)

        const quizResult: IQuizResult = {
            name: userFirstName,
            userId,
            category: userState.categoryQuiz,
            lengthQuiz: userState.lengthQuiz,
            correctAnswers: userState.correctAnswers,
        }

        appendQuizResult(quizResult)

        resetUserState(userId)

        return
    } catch (error) {
        appendErr(error as NodeJS.ErrnoException)
    }
}

