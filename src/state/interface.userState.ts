// Интерфейс для хранения состояния пользователя
export interface IUserState {
    categoryQuiz: string // Категория викторины
    lengthQuiz: number // Количество вопросов в викторине
    currentQuestion: number // Текущий вопрос в викторине
    correctAnswers: number // Количество правильных ответов
    chatId: number
}

// Определяю тип для объекта, хранящего состояния всех пользователей
// Ключом является строка, представляющая идентификатор пользователя,
// значением - состояние пользователя 

// Интерфейс для хранения состояний всех пользователей
export interface IUserStates {
    [userId: string]: IUserState
}