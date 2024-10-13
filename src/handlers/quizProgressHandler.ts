import { Context, Telegraf } from "telegraf";
import { getUserState } from "../states/userStates";
import { imageSender } from "../senders/imageSender";
import { questionSender } from "../senders/questionSender";
import { IUserState } from "../states/interface.userState";

// Функция для обработки прогресса викторины
export async function quizProgressHandler(
  bot: Telegraf<Context>,
  userId: number,
) {
  const userState: IUserState = getUserState(userId);

  await imageSender(bot, userId);
  await questionSender(bot, userId);
}
