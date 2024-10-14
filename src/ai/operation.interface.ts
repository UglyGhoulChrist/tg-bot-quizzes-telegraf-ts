export interface IOperation {
    id: string;
    description: string;
    createdAt: string | null;
    createdBy: string;
    modifiedAt: string | null;
    done: boolean;
    metadata: null;
}
