// Состояние бота (запущен или нет)
let botStates: boolean;

// Последняя команда
let lastCommand: string;

// Функция для получения состояния бота
export function getBotState(): boolean {
    return botStates;
}

// Функция для установки состояния бота
export function setBotState(isActive: boolean): void {
    botStates = isActive;
}

// Функция для установки последней команды
export function setLastCommand(command: string): void {
    lastCommand = command;
}

// Функция для получения последней команды
export function getLastCommand(): string {
    return lastCommand;
}
