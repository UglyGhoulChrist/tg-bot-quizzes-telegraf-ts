import { Context, Telegraf } from 'telegraf';
import { PollAnswer, Update } from "@telegraf/types"
import { IUserState } from "../states/interface.userState"
import { getUserState, setUserState } from "../states/userStates"
import { delay } from "../utils/delay"
import { game } from '../game/game';
import { IQuiz } from '../data/interface.quiz';
import { factSender } from '../senders/factSender';

export async function questionAnswerHandler(bot: Telegraf<Context>, ctx: Context<Update.PollAnswerUpdate>) {

    const answer: PollAnswer = ctx.pollAnswer;

    // Если информация о пользователе отсутствует, выходим из функции
    if (!answer.user) return

    const userId: number = answer.user.id;
    const userState: IUserState = getUserState(userId);
    // Если состояние пользователя не найдено, выходим из функции
    if (!userId || !userState) return;

    const currentQuestion: IQuiz = userState.currentListQuestions[userState.currentIndexQuestion]
    const correctAnswer: number = currentQuestion.correct

    // Проверяем, правильный ли ответ
    if (answer.option_ids?.[0] === correctAnswer) {
        userState.counterCorrectAnswers += 1;
    }

    // Задержка в 2 секунды
    await delay(2000);

    await factSender(bot, userId)

    // Переходим к следующему вопросу
    userState.currentIndexQuestion += 1;
    // Обновляем состояние пользователя
    setUserState(userId, userState);
    await game(bot, userId);
}
