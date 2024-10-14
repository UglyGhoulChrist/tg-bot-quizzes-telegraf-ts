import { Context, Telegraf } from "telegraf";
import { appendError } from "../loggers/appendError";
import { getUserState } from "../states/userStates";
import { IUserState } from "../states/interface.userState";

export async function questionSender(
    bot: Telegraf<Context>,
    userId: number,
): Promise<void> {
    const userState: IUserState = getUserState(userId);
    const { chatId, currentListQuestions, currentIndexQuestion } = userState;
    const { question, options, correct } =
        currentListQuestions[currentIndexQuestion];

    try {
        await bot.telegram.sendQuiz(
            chatId,
            question,
            options,
            { is_anonymous: false, correct_option_id: correct },
        );
    } catch (error) {
        appendError(error as NodeJS.ErrnoException);
    }
}
