import { data } from "../data/data";
import { IData } from "../data/interface.data";

// Функция для получения отсортированного списка вопросов категории "insects"
function getSortedQuestionsList(data: IData, category: string): string[] {
    if (!data[category]) {
        return [];
    }

    const questionsList: string[] = data[category].listQuestions.map(question => question.question);
    questionsList.sort();
    return questionsList;
}

// Получение отсортированного списка вопросов для категории "insects"
const sortedQuestionsList = getSortedQuestionsList(data, "insects");
console.log(sortedQuestionsList);