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
exports.categorySelectionHandler = void 0;
const userStates_1 = require("../states/userStates");
const constants_1 = require("../constants");
const data_1 = require("../data/data");
const game_1 = require("../game/game");
const appendError_1 = require("../loggers/appendError");
const changeListAnswersAndSelectFact_1 = require("../utils/changeListAnswersAndSelectFact");
function categorySelectionHandler(bot, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!ctx.from || !ctx.chat || !ctx.message || !('text' in ctx.message)) {
            return;
        }
        const userId = ctx.from.id;
        const chatId = ctx.chat.id;
        const userName = ctx.from.first_name;
        if ((0, userStates_1.getUserState)(userId)) {
            try {
                yield ctx.reply(constants_1.messageNotFinish);
            }
            catch (error) {
                (0, appendError_1.appendError)(error);
            }
            return;
        }
        const currentCategory = ctx.message.text.slice(1);
        const currentListQuestions = (0, changeListAnswersAndSelectFact_1.changeListAnswersAndSelectFact)(data_1.data[currentCategory].listQuestions);
        const lengthListQuestions = currentListQuestions.length;
        (0, userStates_1.setUserState)(userId, {
            userName,
            chatId,
            currentCategory,
            currentListQuestions,
            lengthListQuestions,
            currentIndexQuestion: 0,
            counterCorrectAnswers: 0,
        });
        yield (0, game_1.game)(bot, userId);
    });
}
exports.categorySelectionHandler = categorySelectionHandler;
