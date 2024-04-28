import { Context, Telegraf } from "telegraf";
import { data } from "../data/data";
import { getUserState } from "../state/userStates";
import { sendPhoto } from "./sendPhoto";
import { sendQuestion } from "./sendQuestion";

// Функция для обработки прогресса викторины
export async function handleQuizProgress(bot: Telegraf<Context>, userId: number) {
    const userState = getUserState(userId);
    const chatId = userState.chatId;
    const quiz = data[userState.categoryQuiz].listQuestions[userState.currentQuestion];

    await sendPhoto(bot, quiz, chatId, userId);
    await sendQuestion(bot, quiz, chatId);
}