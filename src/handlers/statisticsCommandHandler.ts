import { Context } from "telegraf";
import { appendLog } from "../loggers/appendLog";
import { config } from "dotenv";
import { developerSender } from "../senders/developerSender";
import { userSender } from "../senders/userSender";
import { getLastCommand, setLastCommand } from "../states/botStates";
import { deleteMessageAfterDelay } from "../utils/deleteMessageAfterDelay";

config();

const developerId: number = parseInt(process.env.DEVELOPER_ID as string);

export async function statisticsCommandHandler(ctx: Context): Promise<void> {
    const userId: number | undefined = ctx.from?.id;
    const idLastCommand: number | undefined = ctx.message?.message_id;

    if (getLastCommand() === "/statistics" && idLastCommand) {
        await deleteMessageAfterDelay(ctx, idLastCommand, 2000);
        return;
    }
    setLastCommand("/statistics");
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
