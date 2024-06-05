import { data } from "../data/data";
import { IData } from "../data/interface.data";

// Функция для получения отсортированного списка правильных ответов категории "insects"
function getSortedCorrectAnswersList(data: IData, category: string): string[] {
    if (!data[category]) {
        return [];
    }

    const correctAnswersList: string[] = data[category].listQuestions.map(question => question.options[question.correct]);
    correctAnswersList.sort();
    return correctAnswersList;
}

// Получение отсортированного списка вопросов для категории "insects"
const sortedCorrectAnswersList: string[] = getSortedCorrectAnswersList(data, "insects");
console.log(sortedCorrectAnswersList);

// deno run --unstable-sloppy-imports src/utils/getSortedAnswersList.ts