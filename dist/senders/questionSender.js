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
exports.questionSender = void 0;
const appendError_1 = require("../loggers/appendError");
const userStates_1 = require("../states/userStates");
function questionSender(bot, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userState = (0, userStates_1.getUserState)(userId);
        const { chatId, currentListQuestions, currentIndexQuestion } = userState;
        const { question, options, correct } = currentListQuestions[currentIndexQuestion];
        try {
            yield bot.telegram.sendQuiz(chatId, question, options, { is_anonymous: false, correct_option_id: correct });
        }
        catch (error) {
            (0, appendError_1.appendError)(error);
        }
    });
}
exports.questionSender = questionSender;
