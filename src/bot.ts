import { config } from 'dotenv'
import { Context, Telegraf } from 'telegraf'
import { Update } from '@telegraf/types'
import { commands } from './commands/commands'
import { data } from './data/data'
import { appendLog } from './loggers/appendLog'
import { gracefulShutdown } from './utils/gracefulShutdown'
import { helpCommandHandler } from './handlers/helpCommandHandler'
import { resetCommandHandler } from './handlers/resetCommandHandler'
import { startCommandHandler } from './handlers/startCommandHandler'
import { messageHandler } from './handlers/messageHandler'
import { questionAnswerHandler } from './handlers/questionAnswerHandler'
import { setBotState } from './states/botStates'
import { categorySelectionHandler } from './handlers/categorySelectionHandler'
import { appendError } from './loggers/appendError'

config()

// Получаю список категорий викторин
const listQuizes: string[] = Object.keys(data)

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string)

// Инициализация команд
bot.telegram.setMyCommands(commands)

// Обработка команды `help`
bot.command('help', helpCommandHandler)

// Обработка команды `start`
bot.command('start', startCommandHandler)

// Обработка команды `reset`
bot.command('reset', resetCommandHandler)

// Создаю регулярное выражение, которое соответствует любой викторине из массива викторин
const quizesPattern: RegExp = new RegExp(listQuizes.join('|'), 'i');

// Обработка поиска команды запуска викторин
bot.command(quizesPattern, (ctx) => categorySelectionHandler(bot, ctx))

// Обработка выбора ответа на викторину
bot.on('poll_answer', (ctx) => questionAnswerHandler(bot, ctx));

// Обработка/удаление пользовательских сообщений
bot.on('message', messageHandler)

// Лог запуска бота
bot.launch(() => {
    setBotState(true)
    appendLog('Бот успешно запущен.')
})

// Обработчик ошибок бота
bot.catch((error) => appendError(error as NodeJS.ErrnoException))

// Обработчики для корректной остановки бота
process.once('SIGINT', () => gracefulShutdown(bot, 'SIGINT'))
process.once('SIGTERM', () => gracefulShutdown(bot, 'SIGTERM'))