import { Context, Telegraf } from "telegraf";
import { IQuiz } from "../data/interface.quiz";
import { promises as fsPromises } from 'node:fs';
import { join } from 'node:path';
import { delay } from "../utils/delay";
import { getUserState } from '../state/userStates';
import { IUserState } from "../state/interface.userState";
import { appendErr } from "../loggers/appendErr";

export async function sendPhoto(bot: Telegraf<Context>, quiz: IQuiz, chatId: number, userId: number) {
    const userState: IUserState = getUserState(userId)

    try {
        const photoPath: string = join(__dirname, '..', 'images', userState.categoryQuiz, quiz.image)
        const photo: Buffer = await fsPromises.readFile(photoPath)
        await bot.telegram.sendPhoto(chatId, { source: photo })
        // Задержка в 3 секунды
        await delay(3000)
    } catch (error) {
        appendErr(error as NodeJS.ErrnoException)
    }
}