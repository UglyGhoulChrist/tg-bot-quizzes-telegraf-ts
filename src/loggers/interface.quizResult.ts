// Интерфейс для результатов викторины
export interface IQuizResult {
    userName: string;
    userId: number;
    currentCategory: string;
    lengthListQuestions: number;
    counterCorrectAnswers: number;
}
