"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const dataAnimals09_1 = require("./dataAnimals09");
const dataAnimals1019_1 = require("./dataAnimals1019");
const dataSpaces09_1 = require("./dataSpaces09");
const dataSpaces1019_1 = require("./dataSpaces1019");
exports.data = {
    animals: {
        description: 'Викторина про животных',
        listQuestions: [...dataAnimals09_1.dataAnimals09, ...dataAnimals1019_1.dataAnimals1019,],
    },
    spaces: {
        description: 'Викторина про космос',
        listQuestions: [...dataSpaces09_1.dataSpaces09, ...dataSpaces1019_1.dataSpaces1019,],
    },
};
