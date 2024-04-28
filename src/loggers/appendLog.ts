// Импортирую модуль path для работы с путями файловой системы
import path from 'node:path'
import { appendToFile } from '../utils/appendToFfile'

// Путь к файлу логов бота
const LOG_FILE_PATH = path.join('logFiles', 'botLogs.log')

// Функция для добавления лога в файл логов
export async function appendLog(logMessage: string): Promise<void> {
    // Получаю текущую дату и время в формате ISO
    const timestamp = new Date().toISOString()
    // Формирую запись лога
    const logEntry = `INFO - ${timestamp}: ${logMessage}\n`
    // Добавляю запись в файл логов
    await appendToFile(LOG_FILE_PATH, logEntry)
}