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
exports.sendCompletion = void 0;
const userStates_1 = require("../state/userStates");
const appendQuizResult_1 = require("../loggers/appendQuizResult");
const appendErr_1 = require("../loggers/appendErr");
function sendCompletion(bot, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userState = (0, userStates_1.getUserState)(userId);
        const chatId = userState.chatId;
        const firstName = userState.firstName;
        try {
            yield bot.telegram.sendMessage(chatId, `Ура! Ты прошёл всю викторину и ответил на ${userState.lengthQuiz} вопросов!
Твой результат: ${userState.correctAnswers} правильных ответов. Ты молодец!
Хочешь улучшить свой результат? Нажми /start и попробуй снова! 🏆`);
            const quizResult = {
                name: firstName,
                userId,
                category: userState.categoryQuiz,
                lengthQuiz: userState.lengthQuiz,
                correctAnswers: userState.correctAnswers,
            };
            (0, appendQuizResult_1.appendQuizResult)(quizResult);
            (0, userStates_1.resetUserState)(userId);
            return;
        }
        catch (error) {
            (0, appendErr_1.appendErr)(error);
        }
    });
}
exports.sendCompletion = sendCompletion;
