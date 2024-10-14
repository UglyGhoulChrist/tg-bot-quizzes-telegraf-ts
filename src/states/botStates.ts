// Состояние бота (запущен или нет)
let botStates: boolean;

// Функция для получения состояния бота
export function getBotState(): boolean {
    return botStates;
}

// Функция для установки состояния бота
export function setBotState(isActive: boolean): void {
    botStates = isActive;
}
