import { Telegraf, Context } from 'telegraf';
import { getUserState } from '../states/userStates';
import { appendLog } from '../loggers/appendLog';
import { IUserState } from '../states/interface.userState';
import { getBotState } from '../states/botStates';
import { imageSender } from '../senders/imageSender';
import { questionSender } from '../senders/questionSender';
import { quizCompletionHandler } from '../handlers/quizCompletionHandler';
import { delay } from '../utils/delay';

export async function game(bot: Telegraf<Context>, userId: number): Promise<void> {

    // Проверяем, запущен ли бот перед отправкой викторины
    if (!getBotState()) {
        return appendLog('Бот не запущен, отправка викторины невозможна.')
    }

    const userState: IUserState = getUserState(userId)

    if (userState.currentIndexQuestion >= userState.lengthListQuestions) {
        // Обработчик окончания викторины
        await quizCompletionHandler(bot, userId)
    }

    // Отправка сообщения с картинкой из вопроса
    await imageSender(bot, userId)
    // Задержка в 3 секунды
    await delay(3000)

    // Отправка сообщения с вопросом викторины и вариантами ответа
    await questionSender(bot, userId)
}
