import { Context, Telegraf } from "telegraf";
import { data } from "../data/data";
import { getUserState } from "../state/userStates";
import { sendPhoto } from "./sendPhoto";
import { sendQuestion } from "./sendQuestion";
import { IUserState } from "../state/interface.userState";
import { IQuiz } from "../data/interface.quiz";

// Функция для обработки прогресса викторины
export async function handleQuizProgress(bot: Telegraf<Context>, userId: number) {
    const userState: IUserState = getUserState(userId);
    const quiz: IQuiz = data[userState.categoryQuiz].listQuestions[userState.currentQuestion];

    await sendPhoto(bot, quiz, userId);
    await sendQuestion(bot, quiz, userId);
}