// GET запрос async к GPT

import { HEADERS } from "./constants";

export async function sendGetRequest(url: string) {
    const response: Response = await fetch(url, {
        method: "GET",
        headers: HEADERS,
    });
    return response.json();
}
