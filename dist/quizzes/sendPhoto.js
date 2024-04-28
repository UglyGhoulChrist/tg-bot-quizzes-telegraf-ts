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
exports.sendPhoto = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const delay_1 = require("../utils/delay");
const userStates_1 = require("../state/userStates");
const appendErr_1 = require("../loggers/appendErr");
function sendPhoto(bot, quiz, chatId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userState = (0, userStates_1.getUserState)(userId);
        try {
            const photoPath = (0, node_path_1.join)(__dirname, '..', 'images', userState.categoryQuiz, quiz.image);
            const photo = yield node_fs_1.promises.readFile(photoPath);
            yield bot.telegram.sendPhoto(chatId, { source: photo });
            yield (0, delay_1.delay)(3000);
        }
        catch (error) {
            (0, appendErr_1.appendErr)(error);
        }
    });
}
exports.sendPhoto = sendPhoto;
