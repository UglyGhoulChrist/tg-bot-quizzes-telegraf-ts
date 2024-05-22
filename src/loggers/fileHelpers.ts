import { promises as fs } from 'node:fs'
import path from 'node:path'

// Функция проверки наличия файла и создания файла, если он отсутствует
export async function fileHelpers(filePath: string) {
    try {
        await fs.access(filePath)
    } catch {
        await fs.mkdir(path.dirname(filePath), { recursive: true })
        await fs.writeFile(filePath, '', { encoding: 'utf-8' })
    }
}