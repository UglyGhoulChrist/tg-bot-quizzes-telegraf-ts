import fetch from "node-fetch";
import dotenv from "dotenv";
import { IApiResponse } from "./result.interface";
import { appendError } from "../loggers/appendError";

const URL = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion";

dotenv.config();

export async function fetchAIResponse(userText: string) {
    // Собираем запрос
    const data = {
        modelUri: `gpt://${process.env.FOLDER_ID}/yandexgpt`,
        completionOptions: { temperature: 0.3, maxTokens: 1000 },
        messages: [
            { role: "system", text: "Ты детский помошник." },
            { role: "user", text: userText },
        ],
    };

    try {
        // Отправляем запрос
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Api-Key ${process.env.API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result: IApiResponse = await response.json();

        if (result.result.alternatives.length > 0) {
            const text: string = result.result.alternatives[0].message.text;
            // Возвращаем результат
            return text;
        } else {
            return "У меня нет ответа";
        }
    } catch (error) {
        await appendError(error as NodeJS.ErrnoException);
        return "Ошибка";
    }
}
