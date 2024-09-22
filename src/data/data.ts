import { IData } from "./interface.data";
import { dataAnimals } from "./dataAnimals";
import { dataSpaces } from "./dataSpaces";
import { dataInsects } from "./dataInsects";
import { dataNature } from "./dataNature";

// Объект викторин, хранящий все викторины
// Ключом является строка, представляющая категорию викторины,
// значением - описание викторины и список вопросов
export const data: IData = {
    nature: {
        description: "Викторина про природу",
        listQuestions: dataNature,
    },
    animals: {
        description: "Викторина про животных",
        listQuestions: dataAnimals,
    },
    insects: {
        description: "Викторина про маленьких обитателей природы",
        listQuestions: dataInsects,
    },
    spaces: {
        description: "Викторина про космос",
        listQuestions: dataSpaces,
    },
};
