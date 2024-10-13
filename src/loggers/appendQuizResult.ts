import path from "node:path";
import { IQuizResult } from "./interface.quizResult";
import { loggers } from "./loggers";

// Путь к файлу результатов викторин
const QUIZ_RESULTS_FILE_PATH: string = path.join("logFiles", "quizResults.log");

// Функция для добавления результатов викторины в файл результатов
export async function appendQuizResult(quizResult: IQuizResult): Promise<void> {
    // Получаю текущую дату и время в формате ISO
    const timestamp: string = new Date().toISOString();
    // Формирую запись результата викторины
    const resultEntry: string = `${timestamp}: ${JSON.stringify(quizResult)}\n`;
    // Добавляю запись в файл результатов
    await loggers(QUIZ_RESULTS_FILE_PATH, resultEntry);
}
