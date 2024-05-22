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
exports.game = void 0;
const userStates_1 = require("../states/userStates");
const appendLog_1 = require("../loggers/appendLog");
const botStates_1 = require("../states/botStates");
const imageSender_1 = require("../senders/imageSender");
const questionSender_1 = require("../senders/questionSender");
const quizCompletionHandler_1 = require("../handlers/quizCompletionHandler");
const delay_1 = require("../utils/delay");
function game(bot, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, botStates_1.getBotState)()) {
            return (0, appendLog_1.appendLog)('Бот не запущен, отправка викторины невозможна.');
        }
        const userState = (0, userStates_1.getUserState)(userId);
        if (userState.currentIndexQuestion >= userState.lengthListQuestions) {
            yield (0, quizCompletionHandler_1.quizCompletionHandler)(bot, userId);
        }
        yield (0, imageSender_1.imageSender)(bot, userId);
        yield (0, delay_1.delay)(3000);
        yield (0, questionSender_1.questionSender)(bot, userId);
    });
}
exports.game = game;
