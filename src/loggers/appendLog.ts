import path from "node:path";
import { loggers } from "./loggers";

// Путь к файлу логов бота
const LOG_FILE_PATH: string = path.join("logFiles", "botLogs.log");

// Функция для добавления info в файл логов
export async function appendLog(logMessage: string): Promise<void> {
    // Получаю текущую дату и время в формате ISO
    const timestamp: string = new Date().toISOString();
    // Формирую запись info
    const logEntry: string = `INFO - ${timestamp}: ${logMessage}\n`;
    // Добавляю запись в файл логов
    await loggers(LOG_FILE_PATH, logEntry);
}
