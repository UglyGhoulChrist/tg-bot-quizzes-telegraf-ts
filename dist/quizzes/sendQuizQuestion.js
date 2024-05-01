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
exports.sendQuiz = void 0;
const userStates_1 = require("../state/userStates");
const appendLog_1 = require("../loggers/appendLog");
const data_1 = require("../data/data");
const botStates_1 = require("../state/botStates");
const sendPhoto_1 = require("./sendPhoto");
const sendQuestion_1 = require("./sendQuestion");
const sendCompletion_1 = require("./sendCompletion");
function sendQuiz(bot, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, botStates_1.getBotState)()) {
            (0, appendLog_1.appendLog)('Бот не запущен, отправка викторины невозможна.');
            return;
        }
        const userState = (0, userStates_1.getUserState)(userId);
        if (userState.currentQuestion >= userState.lengthQuiz) {
            (0, sendCompletion_1.sendCompletion)(bot, userId);
        }
        const quiz = data_1.data[userState.categoryQuiz].listQuestions[userState.currentQuestion];
        yield (0, sendPhoto_1.sendPhoto)(bot, quiz, userId);
        yield (0, sendQuestion_1.sendQuestion)(bot, quiz, userId);
    });
}
exports.sendQuiz = sendQuiz;
