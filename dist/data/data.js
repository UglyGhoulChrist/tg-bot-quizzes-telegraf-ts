"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const dataAnimals_1 = require("./dataAnimals");
const dataSpaces_1 = require("./dataSpaces");
const dataInsects_1 = require("./dataInsects");
const dataNature_1 = require("./dataNature");
const data_hemistry_1 = require("./data\u0421hemistry");
exports.data = {
    nature: {
        description: "Викторина про природу",
        listQuestions: dataNature_1.dataNature,
    },
    animals: {
        description: "Викторина про животных",
        listQuestions: dataAnimals_1.dataAnimals,
    },
    insects: {
        description: "Викторина про маленьких обитателей природы",
        listQuestions: dataInsects_1.dataInsects,
    },
    spaces: {
        description: "Викторина про космос",
        listQuestions: dataSpaces_1.dataSpaces,
    },
    chemistry: {
        description: "Викторина по химии (без картинок)",
        listQuestions: data_hemistry_1.dataChemistry,
    },
};
