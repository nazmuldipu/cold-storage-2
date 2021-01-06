export interface Inventory {
  _id: string;
  createdAt: Date;
  date: Date;
  inventoryType: InventoryType;
  vouchar_no: number;
  sr_no: string;
  name: string;
  slug: string;
  customer: User;
  year: number;
  quantity: number;
  balance: number;
  version: number;
  agent: User;
}

export enum InventoryType {
  RECEIVE = 'RECEIVE',
  DELIVERY = 'DELIVERY',
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

