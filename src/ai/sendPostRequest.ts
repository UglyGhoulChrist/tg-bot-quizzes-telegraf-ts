// POST запрос async к GPT

import { HEADERS } from "./constants";
import { IDataGpt } from "./dataGpt.interface";
import { IOperation } from "./operation.interface";

export async function sendPostRequest(
    url: string,
    data: IDataGpt,
): Promise<IOperation> {
    const response = await fetch(url, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(data),
    });
    return response.json() as unknown as IOperation;
}
