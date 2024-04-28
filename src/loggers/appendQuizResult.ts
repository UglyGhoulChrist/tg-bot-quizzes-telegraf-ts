// Импортирую модуль path для работы с путями файловой системы
import path from 'node:path'
import { IQuizResult } from './interface.quizRezult'
import { appendToFile } from '../utils/appendToFfile'

// Путь к файлу результатов викторин
const QUIZ_RESULTS_FILE_PATH = path.join('logFiles', 'quizResults.log')

// Функция для добавления результатов викторины в файл результатов
export async function appendQuizResult(quizResult: IQuizResult): Promise<void> {
    // Получаю текущую дату и время в формате ISO
    const timestamp = new Date().toISOString()
    // Формирую запись результата викторины
    const resultEntry = `${timestamp}: ${JSON.stringify(quizResult)}\n`
    // Добавляю запись в файл результатов
    await appendToFile(QUIZ_RESULTS_FILE_PATH, resultEntry)
}