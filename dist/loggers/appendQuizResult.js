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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendQuizResult = void 0;
const node_path_1 = __importDefault(require("node:path"));
const appendToFfile_1 = require("../utils/appendToFfile");
const QUIZ_RESULTS_FILE_PATH = node_path_1.default.join('logFiles', 'quizResults.log');
function appendQuizResult(quizResult) {
    return __awaiter(this, void 0, void 0, function* () {
        const timestamp = new Date().toISOString();
        const resultEntry = `${timestamp}: ${JSON.stringify(quizResult)}\n`;
        yield (0, appendToFfile_1.appendToFile)(QUIZ_RESULTS_FILE_PATH, resultEntry);
    });
}
exports.appendQuizResult = appendQuizResult;
