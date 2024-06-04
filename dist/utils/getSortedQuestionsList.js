"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../data/data");
function getSortedQuestionsList(data, category) {
    if (!data[category]) {
        return [];
    }
    const questionsList = data[category].listQuestions.map(question => question.question);
    questionsList.sort();
    return questionsList;
}
const sortedQuestionsList = getSortedQuestionsList(data_1.data, "insects");
console.log(sortedQuestionsList);
