import { IQuiz } from "../data/interface.quiz";

export function changeListAnswersAndSelectFact(quizzes: IQuiz[]): IQuiz[] {
    return quizzes.map(({ options, correct, facts, ...quiz }) => {
        // Изменяю первую букву на заглавную и копирую массив вариантов ответа
        const optionsCopy: string[] = options.map((option) =>
            option.charAt(0).toUpperCase() + option.slice(1)
        );

        // Получаю правильный ответ
        const correctAnswer: string = optionsCopy[correct];
        // Удаляю правильный ответ из копии
        optionsCopy.splice(correct, 1);

        // Выбираю два случайных варианта ответа
        const randomOptions: string[] = [];
        while (randomOptions.length < 2) {
            const randomIndex: number = Math.floor(
                Math.random() * optionsCopy.length,
            );
            randomOptions.push(...optionsCopy.splice(randomIndex, 1));
        }

        // Формирую новый массив опций и перемешиваю его
        const newOptions: string[] = [correctAnswer, ...randomOptions].sort(
            () => Math.random() - 0.5
        );

        // Нахожу индекс правильного ответа в новом массиве
        const newCorrect: number = newOptions.indexOf(correctAnswer);

        // Получаю случайный факт, если они есть
        const randomFact: string[] = facts
            ? [facts[Math.floor(Math.random() * facts.length)]]
            : [];

        // Возвращаю измененный объект quiz
        return {
            ...quiz,
            options: newOptions,
            correct: newCorrect,
            facts: randomFact,
        };
    }).sort(() => Math.random() - 0.5); // Перемешиваю массив викторин, если это необходимо
}
