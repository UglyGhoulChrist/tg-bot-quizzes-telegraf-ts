import { Context, Telegraf } from "telegraf";
import { getUserState, resetUserState } from '../state/userStates';
import { IUserState } from "../state/interface.userState";
import { appendQuizResult } from "../loggers/appendQuizResult";
import { IQuizResult } from "../loggers/interface.quizRezult";
import { appendErr } from "../loggers/appendErr";

export async function sendCompletion(bot: Telegraf<Context>, userId: number) {

    const userState: IUserState = getUserState(userId)
    const chatId: number = userState.chatId
    const firstName: string = userState.firstName

    // Отправка сообщения окончания викторины
    try {
        await bot.telegram.sendMessage(chatId, `Ура! Ты прошёл всю викторину и ответил на ${userState.lengthQuiz} вопросов!
Твой результат: ${userState.correctAnswers} правильных ответов. Ты молодец!
Хочешь улучшить свой результат? Нажми /start и попробуй снова! 🏆`)

        const quizResult: IQuizResult = {
            name: firstName,
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

