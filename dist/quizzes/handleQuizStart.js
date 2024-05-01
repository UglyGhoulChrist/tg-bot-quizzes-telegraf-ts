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
exports.handleQuizStart = void 0;
const userStates_1 = require("../state/userStates");
const constants_1 = require("../constants");
const data_1 = require("../data/data");
const sendQuizQuestion_1 = require("./sendQuizQuestion");
const appendErr_1 = require("../loggers/appendErr");
function handleQuizStart(bot, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!ctx.from || !ctx.chat || !ctx.message || !('text' in ctx.message)) {
            return;
        }
        const userId = ctx.from.id;
        const chatId = ctx.chat.id;
        const firstName = ctx.from.first_name;
        if ((0, userStates_1.getUserState)(userId)) {
            try {
                yield ctx.reply(constants_1.messageNotFinish);
            }
            catch (error) {
                (0, appendErr_1.appendErr)(error);
            }
            return;
        }
        const categoryQuiz = ctx.message.text.slice(1);
        (0, userStates_1.setUserState)(userId, {
            firstName,
            categoryQuiz,
            lengthQuiz: data_1.data[categoryQuiz].listQuestions.length,
            currentQuestion: 0,
            correctAnswers: 0,
            chatId,
        });
        yield (0, sendQuizQuestion_1.sendQuiz)(bot, userId);
    });
}
exports.handleQuizStart = handleQuizStart;
