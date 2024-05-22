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
exports.completionSender = void 0;
const userStates_1 = require("../states/userStates");
const appendError_1 = require("../loggers/appendError");
function completionSender(bot, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userState = (0, userStates_1.getUserState)(userId);
        const chatId = userState.chatId;
        try {
            yield bot.telegram.sendMessage(chatId, `Ура! Ты прошёл всю викторину и ответил на ${userState.lengthListQuestions} вопросов!
Твой результат: ${userState.counterCorrectAnswers} правильных ответов. Ты молодец!
Хочешь улучшить свой результат? Нажми /start и попробуй снова! 🏆`);
        }
        catch (error) {
            (0, appendError_1.appendError)(error);
        }
    });
}
exports.completionSender = completionSender;
