interface IUsage {
    inputTextTokens: string;
    completionTokens: string;
    totalTokens: string;
}

interface IAlternative {
    message: {
        role: "assistant" | "user" | "system";
        text: string;
    };
    status: string;
}

interface IResult {
    alternatives: IAlternative[];
    usage: IUsage;
    modelVersion: string;
}

export interface IApiResponse {
    result: IResult;
}
