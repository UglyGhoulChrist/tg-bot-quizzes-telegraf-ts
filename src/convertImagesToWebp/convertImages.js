import fs from "fs-extra"
import { dirname, extname, join, relative } from "path"
import sharp from "sharp"

// Папка с оригинальными изображениями
const originalDir = join("src", "originalImages")
// Папка для сохранения конвертированных изображений
const convertedDir = join("dist", "images")

// Функция для проверки, является ли файл изображением
const isImageFile = (fileName) => {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".tiff", ".webp"]
    return imageExtensions.includes(extname(fileName).toLowerCase())
}

// Рекурсивная функция для сканирования папки и преобразования изображений
const convertImages = async (dir) => {
    const files = await fs.readdir(dir)

    await Promise.all(files.map(async (file) => {
        const filePath = join(dir, file)
        const stat = await fs.stat(filePath)

        if (stat.isDirectory()) {
            // Если это директория, рекурсивно вызываем функцию
            await convertImages(filePath)
        } else if (isImageFile(file)) {
            // Если это изображение, преобразуем его
            console.log(`Обрабатывается: ${filePath}`)
            const relativePath = relative(originalDir, filePath)
            const outputFilePath = join(
                convertedDir,
                relativePath.replace(extname(relativePath), ".webp"),
            )

            // Создаем директорию для выходного файла, если она не существует
            await fs.ensureDir(dirname(outputFilePath))

            // Преобразуем изображение с помощью sharp
            sharp(filePath)
                .resize(900, 900) // Изменяем разрешение на 900x900
                .toFile(outputFilePath, (err, _info) => {
                    if (err) {
                        console.error("Ошибка при конвертации файла:", err)
                    } else {
                        console.log(
                            `Конвертировано: ${filePath} -> ${outputFilePath}`,
                        )
                    }
                })

            console.log(`Сохранено: ${outputFilePath}`)
        }
    }))
}

// Создаем выходную директорию, если она не существует
fs.ensureDirSync(convertedDir)

// Запускаем преобразование изображений
convertImages(originalDir)
    .then(() => {
        console.log("Преобразование изображений завершено.")
    })
    .catch((error) => {
        console.error("Ошибка при преобразовании изображений:", error)
    })
