import { Context, Telegraf } from "telegraf";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { getUserState } from "../states/userStates";
import { appendError } from "../loggers/appendError";
import { delay } from "../utils/delay";
import { fileURLToPath } from "url";

export async function imageSender(
    bot: Telegraf<Context>,
    userId: number,
): Promise<void> {
    const {
        chatId,
        currentListQuestions,
        currentIndexQuestion,
        currentCategory,
    } = getUserState(userId);
    const { image } = currentListQuestions[currentIndexQuestion];

    const __dirname = dirname(fileURLToPath(import.meta.url));

    try {
        const photoPath: string = join(
            __dirname,
            "images",
            currentCategory,
            image,
        );

        const photo: Buffer = await readFile(photoPath);
        await bot.telegram.sendPhoto(chatId, { source: photo });
        // Задержка в 3 секунды после отправки картинки
        await delay(3000);
    } catch (error) {
        appendError(error as NodeJS.ErrnoException);
    }
}
