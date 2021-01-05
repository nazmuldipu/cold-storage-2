export interface Ledger {
  _id: string;
  createdAt: Date;

  sr_no: number;

  customer: User;
  agent: User;
  loan: Loan;

  quantity: number;
  rate: number;
  service_amount: number;

  emptyBag_quantity: number;
  emptyBag_rate: number;
  emptyBag_amount: number;

  labour_charge: number;
  transport_amount: number;
  others_amount: number;

  advance_amount: number;
  total_amount: number;

  note: string;
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

interface Loan {
  _id: string;
  date: Date;
  amount: number;
  rate: number;
  payable: number;
  profit: number;
}
