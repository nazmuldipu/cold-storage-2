import { Ledger } from './ledger.model';

export class Loan {
  constructor(ledger: Ledger) {
    this.createdAt = ledger.createdAt;
    this.year = ledger.year;
    this.customer = ledger.customer;
    this.agent = ledger.agent;
    this.sr_no = ledger.sr_no;
    this.amount = ledger.loan_amount;
    this.rate = ledger.rate;
    this.profit = ledger.loan_profit;
    this.payable = ledger.loan_payable;
  }
  
  _id: string;
  createdAt: Date;
  year: number;
  customer: User;
  agent: User;
  sr_no: string;
  amount: number;
  rate: number;
  profit: number;
  payable: number;
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
