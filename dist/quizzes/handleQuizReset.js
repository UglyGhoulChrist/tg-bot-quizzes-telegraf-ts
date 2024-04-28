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
exports.handleResetCommand = void 0;
const constants_1 = require("../constants");
const appendLog_1 = require("../loggers/appendLog");
const userStates_1 = require("../state/userStates");
const appendErr_1 = require("../loggers/appendErr");
function handleResetCommand(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
        if (userId) {
            (0, userStates_1.resetUserState)(userId);
            try {
                yield ctx.reply(constants_1.messageReset);
            }
            catch (error) {
                (0, appendErr_1.appendErr)(error);
            }
        }
        else {
            (0, appendLog_1.appendLog)('Объект from в контексте не найден.');
        }
    });
}
exports.handleResetCommand = handleResetCommand;
