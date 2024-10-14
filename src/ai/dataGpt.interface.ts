export interface IDataGpt {
    modelUri: string;
    completionOptions: {
        temperature: number;
        maxTokens: number;
    };
    messages: {
        role: string;
        text: string;
    }[];
}
