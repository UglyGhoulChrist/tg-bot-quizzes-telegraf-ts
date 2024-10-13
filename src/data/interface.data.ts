import { IQuiz } from "./interface.quiz";

// Определяю интерфейс для викторины
export interface IQuizCategory {
  description: string;
  listQuestions: IQuiz[];
}

// Определяю тип для объекта, хранящего все викторины
// Ключом является строка, представляющая категорию викторины,
// значением - описание викторины и список вопросов
export interface IData {
  [category: string]: IQuizCategory;
}
