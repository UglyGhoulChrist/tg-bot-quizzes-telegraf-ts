import { Context } from "telegraf";
import { appendError } from "../loggers/appendError";
import { readQuizResult } from "../loggers/readQuizResult";

export async function userSender(ctx: Context) {
    const userId: number | undefined = ctx.from?.id;

    try {
        const data: string = await readQuizResult();

        // Преобразуем данные в нужный формат и фильтруем по userId
        const result: (string | null)[] = data.trim().split("\n").map(
            (line) => {
                const [dateTime, json] = line.split(": ");
                const date: string = dateTime.split("T")[0]; // Получаем только дату (YYYY-MM-DD)

                // Парсим JSON-объект и извлекаем необходимые значения
                const {
                    userName,
                    userId: quizUserId, // Переименуем переменную для избежания конфликта
                    currentCategory,
                    lengthListQuestions,
                    counterCorrectAnswers,
                } = JSON.parse(json);

                // Проверяем, совпадает ли userId из контекста с userId из данных
                if (quizUserId === userId) {
                    // Форматируем строку
                    return `${date}: ${currentCategory}, ${counterCorrectAnswers}/${lengthListQuestions}`;
                }
                return null; // Возвращаем null, если userId не совпадает
            },
        ).filter(Boolean); // Отфильтровываем null значения

        if (result.length > 0) {
            await ctx.reply(`Пройденные викторины:\n${result.join("\n")}`);
        } else {
            await ctx.reply(`У вас нет пройденных викторин.`);
        }
    } catch (error) {
        appendError(error as NodeJS.ErrnoException);
    }
}
