import path from "node:path";
import { readFile } from "node:fs/promises";
import { appendError } from "./appendError";

// Путь к файлу результатов викторин
const QUIZ_RESULTS_FILE_PATH: string = path.join("logFiles", "quizResults.log");

// Функция для чтения результатов викторины из файла
export async function readQuizResult(): Promise<string> {
    try {
        const results: string = await readFile(QUIZ_RESULTS_FILE_PATH, "utf-8");
        return results;
    } catch (error) {
        appendError(error as NodeJS.ErrnoException);
        return "";
    }
}
