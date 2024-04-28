import { BotCommand } from '@telegraf/types'

// Основные команды: `/help`, `/start`, `reset`
export const commands: BotCommand[] = [
    { command: 'help', description: 'Помощь' },
    { command: 'start', description: 'Старт' },
    { command: 'reset', description: 'Сброс' },
]