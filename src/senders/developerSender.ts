import { Context } from "telegraf";
import { appendError } from "../loggers/appendError";
import { readQuizResult } from "../loggers/readQuizResult";

export async function developerSender(ctx: Context) {
    try {
        const data: string = await readQuizResult();

        // Преобразуем данные в нужный формат
        const result: string[] = data.trim().split("\n").map((line) => {
            const [dateTime, json] = line.split(": ");
            const date: string = dateTime.split("T")[0]; // Получаем только дату (YYYY-MM-DD)

            // Парсим JSON-объект и извлекаем необходимые значения
            const {
                userName,
                userId,
                currentCategory,
                lengthListQuestions,
                counterCorrectAnswers,
            } = JSON.parse(json);

            // Форматируем строку
            return `${date}: ${userName}, ${userId}, ${currentCategory}, ${counterCorrectAnswers}/${lengthListQuestions}`;
        });

        await ctx.reply(`Пройденные викторины:\n${result.join("\n")}`);
    } catch (error) {
        appendError(error as NodeJS.ErrnoException);
    }
}
