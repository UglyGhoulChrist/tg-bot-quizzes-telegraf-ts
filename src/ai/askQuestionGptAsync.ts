import { appendError } from "../loggers/appendError";
import { fetchAIResponseGptAsync } from "./fetchAIResponseGptAsync";

// Функция для запроса ввода от пользователя и получения асинхронного текстового ответа от AI
export async function askQuestionGptAsync(message: string): Promise<string> {
    try {
        const response: string = await fetchAIResponseGptAsync(message);
        return response;
    } catch (error) {
        appendError(error as NodeJS.ErrnoException);
        return "Ошибка при получении ответа от GPT.";
    }
}
