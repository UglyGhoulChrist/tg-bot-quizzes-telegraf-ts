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
exports.gracefulShutdown = void 0;
const appendLog_1 = require("../loggers/appendLog");
const botStates_1 = require("../state/botStates");
function gracefulShutdown(bot, signal) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, botStates_1.setBotState)(false);
        yield bot.stop(signal);
        yield (0, appendLog_1.appendLog)(`Бот останавливается...${signal}`);
        process.exit(0);
    });
}
exports.gracefulShutdown = gracefulShutdown;
