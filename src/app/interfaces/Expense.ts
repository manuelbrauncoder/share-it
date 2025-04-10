export interface Expense {
    id: string;
    currency: string;
    value: number
    payerID: string;
    title: string;
    desc?: string;
    imagePath?: string;
}