// Импортирую модуль файловой системы с промисами для асинхронной работы с файлами
import { access, appendFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

// Функция для добавления записи в файл
export async function loggers(
    filePath: string,
    content: string,
): Promise<void> {
    // Проверяю и создаю файл, если нужно
    try {
        await access(filePath);
    } catch {
        await mkdir(path.dirname(filePath), { recursive: true });
        await writeFile(filePath, "", { encoding: "utf-8" });
    }
    // Добавляю запись в файл
    try {
        await appendFile(filePath, content, { encoding: "utf-8" });
    } catch (error) {
        // В случае ошибки вывожу сообщение в консоль
        const err: NodeJS.ErrnoException = error as NodeJS.ErrnoException;
        console.error(
            `Не удалось сохранить в файл (${filePath}):`,
            err.message,
        );
    }
}
