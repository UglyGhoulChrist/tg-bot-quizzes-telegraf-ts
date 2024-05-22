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
exports.quizCompletionHandler = void 0;
const userStates_1 = require("../states/userStates");
const completionSender_1 = require("../senders/completionSender");
const appendQuizResult_1 = require("../loggers/appendQuizResult");
function quizCompletionHandler(bot, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userState = (0, userStates_1.getUserState)(userId);
        const userName = userState.userName;
        yield (0, completionSender_1.completionSender)(bot, userId);
        const quizResult = {
            userName,
            userId,
            currentCategory: userState.currentCategory,
            lengthListQuestions: userState.lengthListQuestions,
            counterCorrectAnswers: userState.counterCorrectAnswers,
        };
        yield (0, appendQuizResult_1.appendQuizResult)(quizResult);
        yield (0, userStates_1.resetUserState)(userId);
    });
}
exports.quizCompletionHandler = quizCompletionHandler;
