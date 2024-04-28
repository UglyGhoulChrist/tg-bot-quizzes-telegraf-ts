// Определяю интерфейс для вопроса викторины
export interface IQuiz {
    id: number
    question: string
    options: string[]
    correct: 0 | 1 | 2
    image: string
}