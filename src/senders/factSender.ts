import { Context, Telegraf } from "telegraf";
import { getUserState } from '../states/userStates';
import { IUserState } from "../states/interface.userState";
import { appendError } from "../loggers/appendError";
import { IQuiz } from "../data/interface.quiz";
import { delay } from "../utils/delay";

export async function factSender(bot: Telegraf<Context>, userId: number) {

    const userState: IUserState = getUserState(userId)
    const chatId: number = userState.chatId
    const currentQuestion: IQuiz = userState.currentListQuestions[userState.currentIndexQuestion]

    try {
        if (!currentQuestion.facts?.length) return
        const fact: string = currentQuestion.facts[0]
        await bot.telegram.sendMessage(chatId, `<b>Интересный факт:</b>\n${fact}`, { parse_mode: 'HTML' })
        // Задержка в 5 секунд после отправки факта
        await delay(5000);
        return
    } catch (error) {
        appendError(error as NodeJS.ErrnoException)
    }
}
