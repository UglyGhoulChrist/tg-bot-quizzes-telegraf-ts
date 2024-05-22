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
exports.loggers = void 0;
const node_fs_1 = require("node:fs");
const fileHelpers_1 = require("./fileHelpers");
function loggers(filePath, content) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, fileHelpers_1.fileHelpers)(filePath);
        try {
            yield node_fs_1.promises.appendFile(filePath, content, { encoding: 'utf-8' });
        }
        catch (error) {
            const err = error;
            console.error(`Не удалось сохранить в файл (${filePath}):`, err.message);
        }
    });
}
exports.loggers = loggers;
