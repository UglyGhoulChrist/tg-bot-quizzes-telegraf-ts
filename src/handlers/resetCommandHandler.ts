import { Context } from "telegraf";
import { messageReset } from "../constants";
import { appendLog } from "../loggers/appendLog";
import { resetUserState } from "../states/userStates";
import { appendError } from "../loggers/appendError";

export async function resetCommandHandler(ctx: Context): Promise<void> {
  const userId: number | undefined = ctx.from?.id;

  if (userId) {
    resetUserState(userId);
    try {
      await ctx.reply(messageReset);
    } catch (error) {
      appendError(error as NodeJS.ErrnoException);
    }
  } else {
    appendLog("Объект from в контексте не найден.");
  }
}
