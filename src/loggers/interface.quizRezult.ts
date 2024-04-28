// Интерфейс для результатов викторины
export interface IQuizResult {
    name: string
    userId: number
    category: string
    lengthQuiz: number
    correctAnswers: number
}