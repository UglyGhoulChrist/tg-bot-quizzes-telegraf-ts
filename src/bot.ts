import { config } from 'dotenv'
import { Context, Telegraf } from 'telegraf'
import { Update } from '@telegraf/types'
import { commands } from './commands'
import { data } from './data/data'
import { appendLog } from './loggers/appendLog'
import { gracefulShutdown } from './utils/gracefulShutdown'
import { handleHelpCommand } from './commands/handleHelpCommand'
import { handleResetCommand } from './quizzes/handleQuizReset'
import { handleStartCommand } from './commands/handleStartCommand'
import { handleMessage } from './handlers/handleMessage'
import { handleQuizAnswer } from './quizzes/handleQuizAnswer'
import { setBotState } from './state/botStates'
import { handleQuizStart } from './quizzes/handleQuizStart'
import { appendErr } from './loggers/appendErr'

config()

// Получаю список категорий викторин
const listQuizes: string[] = Object.keys(data)

const bot: Telegraf<Context<Update>> = new Telegraf(process.env.BOT_TOKEN as string)

// Инициализация команд
bot.telegram.setMyCommands(commands)

// Обработка команды `help`
bot.command('help', handleHelpCommand)

// Обработка команды `start`
bot.command('start', handleStartCommand)

// Обработка команды `reset`
bot.command('reset', handleResetCommand)

// Создаю регулярное выражение, которое соответствует любой викторине из массива викторин
const quizesPattern: RegExp = new RegExp(listQuizes.join('|'), 'i');

// Обработка поиска команды запуска викторин
bot.command(quizesPattern, (ctx) => handleQuizStart(bot, ctx))

// Обработка выбора ответа на викторину
bot.on('poll_answer', (ctx) => handleQuizAnswer(bot, ctx));

// Обработка/удаление пользовательских сообщений
bot.on('message', handleMessage)

// Лог запуска бота
bot.launch(() => {
    setBotState(true)
    appendLog('Бот успешно запущен.')
})

// Обработчик ошибок бота
bot.catch((error) => appendErr(error as NodeJS.ErrnoException))

// Обработчики для корректной остановки бота
process.once('SIGINT', () => gracefulShutdown(bot, 'SIGINT'))
process.once('SIGTERM', () => gracefulShutdown(bot, 'SIGTERM'))