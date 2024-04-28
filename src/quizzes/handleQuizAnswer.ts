import { Context, Telegraf } from 'telegraf';
import { PollAnswer, Update } from "@telegraf/types"
import { data } from "../data/data"
import { IUserState } from "../state/interface.userState"
import { getUserState, setUserState } from "../state/userStates"
import { delay } from "../utils/delay"
import { sendQuiz } from './sendQuizQuestion';

export async function handleQuizAnswer(bot: Telegraf<Context>, ctx: Context<Update.PollAnswerUpdate>) {

    const answer: PollAnswer = ctx.pollAnswer;

    // Если информация о пользователе отсутствует, выходим из функции
    if (!answer.user) return

    const userId = answer.user.id;
    const userState: IUserState | undefined = getUserState(userId);
    // Если состояние пользователя не найдено, выходим из функции
    if (!userId || !userState) return;

    const quiz = data[userState.categoryQuiz].listQuestions[userState.currentQuestion];

    // Проверяем, правильный ли ответ
    if (answer.option_ids?.[0] === quiz.correct) {
        userState.correctAnswers += 1;
    }

    // Переходим к следующему вопросу
    userState.currentQuestion += 1;
    // Обновляем состояние пользователя
    setUserState(userId, userState);

    // Задержка в 1 секунду
    await delay(1000);

    await sendQuiz(bot, userId, ctx.from.first_name);
}
