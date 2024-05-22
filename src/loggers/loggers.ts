// Импортирую модуль файловой системы с промисами для асинхронной работы с файлами
import { promises as fs } from 'node:fs'
import { fileHelpers } from "./fileHelpers"

// Функция для добавления записи в файл
export async function loggers(filePath: string, content: string): Promise<void> {
    // Проверяю и создаю файл, если нужно
    await fileHelpers(filePath)
    try {
        // Добавляю запись в файл
        await fs.appendFile(filePath, content, { encoding: 'utf-8' })
    } catch (error) {
        // В случае ошибки вывожу сообщение в консоль
        const err: NodeJS.ErrnoException = error as NodeJS.ErrnoException
        console.error(`Не удалось сохранить в файл (${filePath}):`, err.message)
    }
}