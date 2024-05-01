import { Context, Telegraf } from "telegraf";
import { IQuiz } from "../data/interface.quiz";
import { appendErr } from "../loggers/appendErr";
import { getUserState } from "../state/userStates";
import { IUserState } from "../state/interface.userState";

export async function sendQuestion(bot: Telegraf<Context>, quiz: IQuiz, userId: number) {
    const userState: IUserState = getUserState(userId)
    const chatId: number = userState.chatId

    try {
        await bot.telegram.sendQuiz(
            chatId,
            quiz.question,
            quiz.options,
            { is_anonymous: false, correct_option_id: quiz.correct }
        )
    } catch (error) {
        appendErr(error as NodeJS.ErrnoException)
    }
}