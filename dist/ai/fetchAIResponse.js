"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAIResponse = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const dotenv_1 = __importDefault(require("dotenv"));
const appendError_1 = require("../loggers/appendError");
const URL = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion";
dotenv_1.default.config();
function fetchAIResponse(userText) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            modelUri: `gpt://${process.env.FOLDER_ID}/yandexgpt`,
            completionOptions: { temperature: 0.3, maxTokens: 1000 },
            messages: [
                { role: "system", text: "Ты детский помошник." },
                { role: "user", text: userText },
            ],
        };
        try {
            const response = yield (0, node_fetch_1.default)(URL, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Api-Key ${process.env.API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = yield response.json();
            if (result.result.alternatives.length > 0) {
                const text = result.result.alternatives[0].message.text;
                return text;
            }
            else {
                return "У меня нет ответа";
            }
        }
        catch (error) {
            yield (0, appendError_1.appendError)(error);
            return "Ошибка";
        }
    });
}
exports.fetchAIResponse = fetchAIResponse;
