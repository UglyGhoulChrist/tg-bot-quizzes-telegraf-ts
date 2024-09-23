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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSender = void 0;
const appendError_1 = require("../loggers/appendError");
const readQuizResult_1 = require("../loggers/readQuizResult");
function userSender(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
        try {
            const data = yield (0, readQuizResult_1.readQuizResult)();
            const result = data.trim().split("\n").map((line) => {
                const [dateTime, json] = line.split(": ");
                const date = dateTime.split("T")[0];
                const { userName, userId: quizUserId, currentCategory, lengthListQuestions, counterCorrectAnswers, } = JSON.parse(json);
                if (quizUserId === userId) {
                    return `${date}: ${currentCategory}, ${counterCorrectAnswers}/${lengthListQuestions}`;
                }
                return null;
            }).filter(Boolean);
            if (result.length > 0) {
                yield ctx.reply(`Пройденные викторины:\n${result.join("\n")}`);
            }
            else {
                yield ctx.reply(`У вас нет пройденных викторин.`);
            }
        }
        catch (error) {
            (0, appendError_1.appendError)(error);
        }
    });
}
exports.userSender = userSender;
