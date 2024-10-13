import { Context } from "telegraf";
import { appendLog } from "../loggers/appendLog";
import { config } from "dotenv";
import { developerSender } from "../senders/developerSender";
import { userSender } from "../senders/userSender";

config();

const developerId: number = parseInt(process.env.DEVELOPER_ID as string);

export async function statisticsCommandHandler(ctx: Context): Promise<void> {
  const userId: number | undefined = ctx.from?.id;

  if (!userId) {
    appendLog("Объект from в контексте не найден.");
    return;
  }

  if (userId === developerId) {
    developerSender(ctx);
  } else {
    userSender(ctx);
  }
}
