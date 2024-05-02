"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const dataAnimals04_1 = require("./dataAnimals04");
const dataAnimals59_1 = require("./dataAnimals59");
const dataAnimals1014_1 = require("./dataAnimals1014");
const dataAnimals1519_1 = require("./dataAnimals1519");
const dataSpaces04_1 = require("./dataSpaces04");
const dataSpaces59_1 = require("./dataSpaces59");
const dataSpaces1014_1 = require("./dataSpaces1014");
const dataSpaces1519_1 = require("./dataSpaces1519");
exports.data = {
    animals: {
        description: 'Викторина про животных',
        listQuestions: [...dataAnimals04_1.dataAnimals04, ...dataAnimals59_1.dataAnimals59, ...dataAnimals1014_1.dataAnimals1014, ...dataAnimals1519_1.dataAnimals1519,],
    },
    spaces: {
        description: 'Викторина про космос',
        listQuestions: [...dataSpaces04_1.dataSpaces04, ...dataSpaces59_1.dataSpaces59, ...dataSpaces1014_1.dataSpaces1014, ...dataSpaces1519_1.dataSpaces1519,],
    },
};
