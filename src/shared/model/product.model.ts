import { Ledger } from './ledger.model';

export class Product {
  constructor(ledger: Ledger) {
    this.createdAt = ledger.createdAt;
    this.sr_no = ledger.sr_no;
    this.year = ledger.year;
    this.customer = ledger.customer;
    this.agent = ledger.agent;
    this.quantity = ledger.quantity;
    this.rate = ledger.rate;
    this.service_amount = ledger.service_amount;
  }

  _id: string;
  createdAt: Date;
  sr_no: string;
  year: number;
  customer: User;
  agent: User;

  quantity: number;
  rate: number;
  service_amount: number;

  version: number;
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
