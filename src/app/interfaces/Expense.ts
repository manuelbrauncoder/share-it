export interface Expense {
    id: string;
    currency: string;
    value: number
    payerID: string;
    groupID: string;
    title: string;
    desc: string;
    imagePath?: string;
}