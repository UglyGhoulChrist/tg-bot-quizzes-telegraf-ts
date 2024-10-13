import { Context, Telegraf } from "telegraf";
import { getUserState, setUserState } from "../states/userStates";
import { messageNotFinish } from "../constants";
import { data } from "../data/data";
import { game } from "../game/game";
import { appendError } from "../loggers/appendError";
import { changeListAnswersAndSelectFact } from "../utils/changeListAnswersAndSelectFact";
import { IQuiz } from "../data/interface.quiz";

export async function categorySelectionHandler(
  bot: Telegraf<Context>,
  ctx: Context,
) {
  if (!ctx.from || !ctx.chat || !ctx.message || !("text" in ctx.message)) {
    // Если какое-либо из этих значений undefined или сообщение не содержит текста, то выхожу из функции
    return;
  }

  const userId: number = ctx.from.id;
  const chatId: number = ctx.chat.id;
  const userName: string = ctx.from.first_name;

  // Проверяю начата ли викторина
  if (getUserState(userId)) {
    try {
      await ctx.reply(messageNotFinish);
    } catch (error) {
      appendError(error as NodeJS.ErrnoException);
    }
    return;
  }

  // ctx.message.text существует, так как проверил 'text' in ctx.message
  const currentCategory: string = ctx.message.text.slice(1);
  const currentListQuestions: IQuiz[] = changeListAnswersAndSelectFact(
    data[currentCategory].listQuestions,
  );
  const lengthListQuestions: number = currentListQuestions.length;

  // Создаю состояние пользователя
  setUserState(userId, {
    userName,
    chatId,
    currentCategory,
    currentListQuestions,
    lengthListQuestions,
    currentIndexQuestion: 0,
    counterCorrectAnswers: 0,
  });

  // Запускаю игру
  await game(bot, userId);
}
