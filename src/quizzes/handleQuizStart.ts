import { Context, Telegraf } from 'telegraf';
import { getUserState, setUserState } from '../state/userStates';
import { messageNotFinish } from '../constants';
import { data } from '../data/data';
import { sendQuiz } from './sendQuizQuestion';
import { appendErr } from '../loggers/appendErr';

export async function handleQuizStart(bot: Telegraf<Context>, ctx: Context) {
    if (!ctx.from || !ctx.chat || !ctx.message || !('text' in ctx.message)) {
        // Если какое-либо из этих значений undefined или сообщение не содержит текста, то выходим из функции
        return;
    }

    const userId: number = ctx.from.id;
    const chatId: number = ctx.chat.id;
    const userFirstName: string = ctx.from.first_name;

    // Проверка начата ли викторина
    if (getUserState(userId)) {

        try {
            await ctx.reply(messageNotFinish);
        } catch (error) {
            appendErr(error as NodeJS.ErrnoException)
        }
        return;
    }

    // Теперь мы уверены, что ctx.message.text существует, так как мы проверили 'text' in ctx.message
    const categoryQuiz: string = ctx.message.text.slice(1);

    setUserState(userId, {
        categoryQuiz,
        lengthQuiz: data[categoryQuiz].listQuestions.length,
        currentQuestion: 0,
        correctAnswers: 0,
        chatId,
    });

    await sendQuiz(bot, userId, userFirstName);
}