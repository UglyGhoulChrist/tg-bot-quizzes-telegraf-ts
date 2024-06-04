"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const dataAnimals_1 = require("./dataAnimals");
const dataSpaces_1 = require("./dataSpaces");
const dataInsects_1 = require("./dataInsects");
exports.data = {
    animals: {
        description: 'Викторина про животных',
        listQuestions: dataAnimals_1.dataAnimals,
    },
    spaces: {
        description: 'Викторина про космос',
        listQuestions: dataSpaces_1.dataSpaces,
    },
    insects: {
        description: 'Викторина про насекомых и маленьких обитателей природы',
        listQuestions: dataInsects_1.dataInsects,
    }
};
