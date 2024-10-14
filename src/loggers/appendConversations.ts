// Запись разговоров пользователя с Yandex GPT

import path from "node:path";
import { loggers } from "./loggers";

// Функция для добавления разговоров в файл логов
export async function appendConversations(
    id: number,
    name: string = "undefined",
    logMessage: string,
): Promise<void> {
    // Получаю текущую дату и время в формате ISO
    const timestamp: string = new Date().toISOString();
    // Формирую запись разговоров
    const logEntry: string = `${timestamp} - ${name} : ${logMessage}\n`;
    // Путь к файлу логов бота
    const LOG_FILE_PATH: string = path.join("logFiles", `${id}.log`);
    // Добавляю запись в файл логов
    await loggers(LOG_FILE_PATH, logEntry);
}
