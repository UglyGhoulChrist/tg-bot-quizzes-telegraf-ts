import { Update } from '@telegraf/types/update'
import { Context, Telegraf } from 'telegraf'
import { appendLog } from '../loggers/appendLog'
import { setBotState } from '../state/botStates'

// Функция для корректной остановки бота
export async function gracefulShutdown(bot: Telegraf<Context<Update>>, signal: string) {
    // Устанавливаю состояние бота как "не запущен"
    setBotState(false)
    await bot.stop(signal)
    // Здесь можно добавить дополнительную логику для ожидания завершения асинхронных операций
    await appendLog(`Бот останавливается...${signal}`)
    process.exit(0)
}