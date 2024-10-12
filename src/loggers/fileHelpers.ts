import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

// Функция проверки наличия файла и создания файла, если он отсутствует
export async function fileHelpers(filePath: string) {
    try {
        await access(filePath);
    } catch {
        await mkdir(path.dirname(filePath), { recursive: true });
        await writeFile(filePath, "", { encoding: "utf-8" });
    }
}
