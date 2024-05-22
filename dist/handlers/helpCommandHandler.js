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
exports.helpCommandHandler = void 0;
const constants_1 = require("../constants");
const appendError_1 = require("../loggers/appendError");
function helpCommandHandler(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield ctx.replyWithHTML(constants_1.messageHelp, { parse_mode: 'HTML' });
        }
        catch (error) {
            (0, appendError_1.appendError)(error);
        }
    });
}
exports.helpCommandHandler = helpCommandHandler;
