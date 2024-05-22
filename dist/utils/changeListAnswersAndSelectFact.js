"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeListAnswersAndSelectFact = void 0;
function changeListAnswersAndSelectFact(quizzes) {
    return quizzes.map((_a) => {
        var { options, correct, facts } = _a, quiz = __rest(_a, ["options", "correct", "facts"]);
        const optionsCopy = options.map(option => option.charAt(0).toUpperCase() + option.slice(1));
        const correctAnswer = optionsCopy[correct];
        optionsCopy.splice(correct, 1);
        const randomOptions = [];
        while (randomOptions.length < 2) {
            const randomIndex = Math.floor(Math.random() * optionsCopy.length);
            randomOptions.push(...optionsCopy.splice(randomIndex, 1));
        }
        const newOptions = [correctAnswer, ...randomOptions].sort(() => Math.random() - 0.5);
        const newCorrect = newOptions.indexOf(correctAnswer);
        const randomFact = facts ? [facts[Math.floor(Math.random() * facts.length)]] : [];
        return Object.assign(Object.assign({}, quiz), { options: newOptions, correct: newCorrect, facts: randomFact });
    }).sort(() => Math.random() - 0.5);
}
exports.changeListAnswersAndSelectFact = changeListAnswersAndSelectFact;
