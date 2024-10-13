import path from "node:path";
import { loggers } from "./loggers";

// Путь к файлу логов бота
const LOG_FILE_PATH: string = path.join("logFiles", "botLogs.log");

// Функция для добавления error в файл логов
export async function appendError(error: NodeJS.ErrnoException): Promise<void> {
    // Получаю текущую дату и время в формате ISO
    const timestamp: string = new Date().toISOString();
    // Формирую запись error
    const errEntry: string = `ERROR - ${timestamp}: ${error.message}\n`;
    // Добавляю запись в файл логов
    await loggers(LOG_FILE_PATH, errEntry);
}
