export interface IUsage {
    inputTextTokens: string;
    completionTokens: string;
    totalTokens: string;
}

export interface IAlternative {
    message: {
        role: "assistant" | "user" | "system";
        text: string;
    };
    status: string;
}

export interface IResponseGptAsync {
    id: string;
    description: string;
    createdAt: string;
    createdBy: string;
    modifiedAt: string;
    done: boolean;
    response?: {
        "@type": string;
        alternatives: IAlternative[];
        usage: IUsage;
        modelVersion: string;
    };
}
