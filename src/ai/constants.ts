import dotenv from "dotenv";

dotenv.config();

export const URL_GPT_ASYNC: string =
    "https://llm.api.cloud.yandex.net/foundationModels/v1/completionAsync";

export const MODEL_URI_GPT_ASYNC: string =
    `gpt://${process.env.FOLDER_ID}/yandexgpt`;

export const AUTHORIZATION: string = `Api-Key ${process.env.API_KEY}`;

type THeaders = {
    "Accept": string;
    "Authorization": string;
    "Content-Type": string;
};

export const HEADERS: THeaders = {
    "Accept": "application/json",
    "Authorization": AUTHORIZATION,
    "Content-Type": "application/json",
};
