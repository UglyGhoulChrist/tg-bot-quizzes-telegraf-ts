import { Context, Telegraf } from "telegraf";
import { promises as fsPromises } from 'node:fs';
import { join } from 'node:path';
import { getUserState } from '../states/userStates';
import { appendError } from "../loggers/appendError";
import { delay } from "../utils/delay";

export async function imageSender(bot: Telegraf<Context>, userId: number): Promise<void> {
    const { chatId, currentListQuestions, currentIndexQuestion, currentCategory } = getUserState(userId);
    const { image } = currentListQuestions[currentIndexQuestion];

    try {
        const photoPath: string = join(__dirname, '..', 'images', currentCategory, image);
        const photo: Buffer = await fsPromises.readFile(photoPath);
        await bot.telegram.sendPhoto(chatId, { source: photo });
        // Задержка в 3 секунды после отправки картинки
        await delay(3000)
    } catch (error) {
        appendError(error as NodeJS.ErrnoException);
    }
}