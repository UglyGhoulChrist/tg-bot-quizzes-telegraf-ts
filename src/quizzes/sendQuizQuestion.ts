import { Telegraf, Context } from 'telegraf';
import { getUserState } from '../state/userStates';
import { appendLog } from '../loggers/appendLog';
import { data } from '../data/data';
import { IQuiz } from '../data/interface.quiz';
import { IUserState } from '../state/interface.userState';
import { getBotState } from '../state/botStates';
import { sendPhoto } from './sendPhoto';
import { sendQuestion } from './sendQuestion';
import { sendCompletion } from './sendCompletion';

export async function sendQuiz(bot: Telegraf<Context>, userId: number): Promise<void> {

    // Проверяем, запущен ли бот перед отправкой викторины
    if (!getBotState()) {
        appendLog('Бот не запущен, отправка викторины невозможна.')
        return
    }

    const userState: IUserState = getUserState(userId)

    if (userState.currentQuestion >= userState.lengthQuiz) {
        // Отправка сообщения окончания викторины
        sendCompletion(bot, userId)
    }

    const quiz: IQuiz = data[userState.categoryQuiz].listQuestions[userState.currentQuestion]

    // Отправка сообщения с картинкой из вопроса
    await sendPhoto(bot, quiz, userId)

    // Отправка сообщения с вопросом викторины и вариантами ответа
    await sendQuestion(bot, quiz, userId)
}
