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
exports.handleQuizAnswer = void 0;
const data_1 = require("../data/data");
const userStates_1 = require("../state/userStates");
const delay_1 = require("../utils/delay");
const sendQuizQuestion_1 = require("./sendQuizQuestion");
function handleQuizAnswer(bot, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const answer = ctx.pollAnswer;
        if (!answer.user)
            return;
        const userId = answer.user.id;
        const userState = (0, userStates_1.getUserState)(userId);
        if (!userId || !userState)
            return;
        const quiz = data_1.data[userState.categoryQuiz].listQuestions[userState.currentQuestion];
        if (((_a = answer.option_ids) === null || _a === void 0 ? void 0 : _a[0]) === quiz.correct) {
            userState.correctAnswers += 1;
        }
        userState.currentQuestion += 1;
        (0, userStates_1.setUserState)(userId, userState);
        yield (0, delay_1.delay)(1000);
        yield (0, sendQuizQuestion_1.sendQuiz)(bot, userId, ctx.from.first_name);
    });
}
exports.handleQuizAnswer = handleQuizAnswer;
