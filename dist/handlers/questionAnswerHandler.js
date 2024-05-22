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
exports.questionAnswerHandler = void 0;
const userStates_1 = require("../states/userStates");
const delay_1 = require("../utils/delay");
const game_1 = require("../game/game");
const factSender_1 = require("../senders/factSender");
function questionAnswerHandler(bot, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const answer = ctx.pollAnswer;
        if (!answer.user)
            return;
        const userId = answer.user.id;
        const userState = (0, userStates_1.getUserState)(userId);
        if (!userId || !userState)
            return;
        const currentQuestion = userState.currentListQuestions[userState.currentIndexQuestion];
        const correctAnswer = currentQuestion.correct;
        if (((_a = answer.option_ids) === null || _a === void 0 ? void 0 : _a[0]) === correctAnswer) {
            userState.counterCorrectAnswers += 1;
        }
        yield (0, delay_1.delay)(2000);
        yield (0, factSender_1.factSender)(bot, userId);
        userState.currentIndexQuestion += 1;
        (0, userStates_1.setUserState)(userId, userState);
        yield (0, game_1.game)(bot, userId);
    });
}
exports.questionAnswerHandler = questionAnswerHandler;
