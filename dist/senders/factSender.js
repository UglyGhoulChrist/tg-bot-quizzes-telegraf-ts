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
exports.factSender = void 0;
const userStates_1 = require("../states/userStates");
const appendError_1 = require("../loggers/appendError");
const delay_1 = require("../utils/delay");
function factSender(bot, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userState = (0, userStates_1.getUserState)(userId);
        const chatId = userState.chatId;
        const currentQuestion = userState.currentListQuestions[userState.currentIndexQuestion];
        try {
            if (!((_a = currentQuestion.facts) === null || _a === void 0 ? void 0 : _a.length))
                return;
            const fact = currentQuestion.facts[0];
            yield bot.telegram.sendMessage(chatId, `<b>Интересный факт:</b>\n${fact}`, { parse_mode: 'HTML' });
            yield (0, delay_1.delay)(5000);
            return;
        }
        catch (error) {
            (0, appendError_1.appendError)(error);
        }
    });
}
exports.factSender = factSender;
