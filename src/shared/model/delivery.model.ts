export interface Delivery {
    _id: string;
    createdAt: Date;
    date: Date;
    year: number;
    inventoryType: InventoryType;
    sr_no: string;
    customer: User;
    quantity: number;
    rate: number;
    balanceQuantity: number;
    service_rent: number;
    loan_amount: number;
    loan_rate: number;
    loan_profit: number;
    loan_payable: number;
    emptyBag_quantity: number;
    emptyBag_rate: number;
    emptyBag_amount: number;
    total: number;
}

export enum InventoryType {
    RECEIVE = 'RECEIVE',
    DELIVERY = 'DELIVERY',
}
interface Loan {
    _id: string;
    date: Date;
    amount: number;
    rate: number;
    payable: number;
    profit: number;
}
interface User {
    _id: string;
    createdAt: Date;
    slug: string;
    name: string;
    father: string;
    phone: string;
    address: string;
}

