import { Context, Telegraf } from "telegraf";
import { IQuiz } from "../data/interface.quiz";
import { appendErr } from "../loggers/appendErr";

export async function sendQuestion(bot: Telegraf<Context>, quiz: IQuiz, chatId: number) {
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