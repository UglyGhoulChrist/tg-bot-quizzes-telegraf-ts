import { IQuiz } from "../data/interface.quiz"

// Интерфейс для хранения состояния пользователя
export interface IUserState {
    userName: string // Имя пользователя
    chatId: number // Идентификатор чата
    currentCategory: string // Категория викторины
    currentListQuestions: IQuiz[] // Текущий список вопросов
    lengthListQuestions: number // Количество вопросов в викторине
    currentIndexQuestion: number // Индекс текущего вопроса в викторине
    counterCorrectAnswers: number // Счётчик правильных ответов   
}

// Определяю тип для объекта, хранящего состояния всех пользователей
// Ключом является строка, представляющая идентификатор пользователя,
// значением - состояние пользователя 

// Интерфейс для хранения состояний всех пользователей
export interface IUserStates {
    [userId: string]: IUserState
}