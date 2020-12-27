export interface Loading {
  _id: string;
  createdAt: Date;
  
  period: string;
  s_r_date: Date;
  s_r_no: number;

  customer: User;
  agent: User;

  quantity: number;
  rate: number;
  service_amount: number;

  guniBag_quantity: number;
  guniBag_rate: number;
  guniBag_total_amount: number;

  loan_date: Date;
  loan_amount: number;
  loan_rate: number;
  interest_amount: number;
  loan_sum:number;

  labour_charge: number;
  transport_amount: number;
  others_amount: number;

  advance_amount: number;
  total_amount: number;

  product_nature: string;
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
