import { appendError } from "../loggers/appendError";
import { MODEL_URI_GPT_ASYNC, URL_GPT_ASYNC } from "./constants";
import { IDataGpt } from "./dataGpt.interface";
import { IOperation } from "./operation.interface";
import { IResponseGptAsync } from "./responseGptAsync.interface";
import { sendGetRequest } from "./sendGetRequest";
import { sendPostRequest } from "./sendPostRequest";

export async function fetchAIResponseGptAsync(
    userText: string,
): Promise<string> {
    // Собираем запрос
    const data: IDataGpt = {
        modelUri: MODEL_URI_GPT_ASYNC,
        completionOptions: { temperature: 0.3, maxTokens: 1000 },
        messages: [
            { role: "system", text: "Ты детский помошник." },
            { role: "user", text: userText },
        ],
    };

    try {
        // Отправляем POST запрос и получаем объект с id
        const operation: IOperation = await sendPostRequest(
            URL_GPT_ASYNC,
            data,
        );
        const operationId: string = operation.id;

        // Возвращаем Promise, который будет резолвиться, когда операция завершится
        return new Promise((resolve, reject) => {
            // Устанавливаем интервал для отправки GET запросов
            const interval: NodeJS.Timeout = setInterval(async () => {
                // Динамический адрес с id операции
                const getUrl: string =
                    `https://operation.api.cloud.yandex.net/operations/${operationId}`;
                const result: IResponseGptAsync = await sendGetRequest(
                    getUrl,
                ) as IResponseGptAsync;

                // Проверяем поле done
                if (result.done && result.response) {
                    clearInterval(interval); // Останавливаем интервал, если done равно true
                    resolve(result.response.alternatives[0].message.text); // Резолвим Promise с результатом
                }
            }, 1000); // Интервал в 1 секунду
        });
    } catch (error) {
        appendError(error as NodeJS.ErrnoException);
        // Возвращаем ошибку
        return "Ошибка при получении ответа от GPT.";
    }
}