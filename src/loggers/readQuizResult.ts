// Импортирую модуль path для работы с путями файловой системы
import path from "node:path";
// Импортирую модуль файловой системы с промисами для асинхронной работы с файлами
import { promises as fs } from "node:fs";
// Путь к файлу результатов викторин
const QUIZ_RESULTS_FILE_PATH: string = path.join("logFiles", "quizResults.log");

// Функция для добавления результатов викторины в файл результатов
export async function readQuizResult(): Promise<string> {
    const results: string = await fs.readFile(QUIZ_RESULTS_FILE_PATH, "utf-8");
    return results;
}
