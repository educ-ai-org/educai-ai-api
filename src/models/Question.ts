export type Question = {
    description: string;
    correctAnswerKey: string;
    options: Option[];
}

export type Option = {
    key: string;
    description: string;
}