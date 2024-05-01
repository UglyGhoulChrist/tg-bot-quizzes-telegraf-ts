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
exports.handleQuizCompletion = void 0;
const userStates_1 = require("../state/userStates");
const sendCompletion_1 = require("./sendCompletion");
const appendQuizResult_1 = require("../loggers/appendQuizResult");
function handleQuizCompletion(bot, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userState = (0, userStates_1.getUserState)(userId);
        const firstName = userState.firstName;
        if (userState.currentQuestion >= userState.lengthQuiz) {
            yield (0, sendCompletion_1.sendCompletion)(bot, userId);
            const quizResult = {
                name: firstName,
                userId,
                category: userState.categoryQuiz,
                lengthQuiz: userState.lengthQuiz,
                correctAnswers: userState.correctAnswers,
            };
            (0, appendQuizResult_1.appendQuizResult)(quizResult);
            (0, userStates_1.resetUserState)(userId);
        }
    });
}
exports.handleQuizCompletion = handleQuizCompletion;
