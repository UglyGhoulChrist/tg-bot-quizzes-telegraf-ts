// Определяю интерфейс для вопроса викторины
export interface IQuiz {
  id: number;
  question: string;
  options: string[];
  correct: number;
  image: string;
  facts?: string[];
}
