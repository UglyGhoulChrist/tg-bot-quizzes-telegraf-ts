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
exports.imageSender = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const userStates_1 = require("../states/userStates");
const appendError_1 = require("../loggers/appendError");
const delay_1 = require("../utils/delay");
function imageSender(bot, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { chatId, currentListQuestions, currentIndexQuestion, currentCategory } = (0, userStates_1.getUserState)(userId);
        const { image } = currentListQuestions[currentIndexQuestion];
        try {
            const photoPath = (0, node_path_1.join)(__dirname, '..', 'images', currentCategory, image);
            const photo = yield node_fs_1.promises.readFile(photoPath);
            yield bot.telegram.sendPhoto(chatId, { source: photo });
            yield (0, delay_1.delay)(3000);
        }
        catch (error) {
            (0, appendError_1.appendError)(error);
        }
    });
}
exports.imageSender = imageSender;
