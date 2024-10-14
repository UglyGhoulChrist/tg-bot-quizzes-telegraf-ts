import { IUserState, IUserStates } from "./interface.userState";

// Объект для хранения состояний пользователей
const userStates: IUserStates = {};

// Функция для получения состояния пользователя
export function getUserState(userId: number): IUserState {
    return userStates[userId];
}

// Функция для установки состояния пользователя
export function setUserState(userId: number, userState: IUserState): void {
    userStates[userId] = userState;
}

// Функция для сброса состояния пользователя
export function resetUserState(userId: number): void {
    delete userStates[userId];
}

// Экспорт объекта состояний, если он нужен напрямую
export default userStates;
