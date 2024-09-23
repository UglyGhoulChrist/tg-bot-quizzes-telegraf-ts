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
exports.statisticsCommandHandler = void 0;
const appendLog_1 = require("../loggers/appendLog");
const dotenv_1 = require("dotenv");
const developerSender_1 = require("../senders/developerSender");
const userSender_1 = require("../senders/userSender");
(0, dotenv_1.config)();
const developerId = parseInt(process.env.DEVELOPER_ID);
function statisticsCommandHandler(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            (0, appendLog_1.appendLog)("Объект from в контексте не найден.");
            return;
        }
        if (userId === developerId) {
            (0, developerSender_1.developerSender)(ctx);
        }
        else {
            (0, userSender_1.userSender)(ctx);
        }
    });
}
exports.statisticsCommandHandler = statisticsCommandHandler;
