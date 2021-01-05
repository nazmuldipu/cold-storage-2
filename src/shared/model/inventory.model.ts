export interface Inventory {
  _id: string;
  createdAt: Date;
  date: Date;
  inventoryType: InventoryType;
  sr_no: string;
  name: string;
  slug: string;
  customer: string;
  year: number;
  quantity: number;
  balance: number;
  version: number;
  agent: string;
}

export enum InventoryType {
  RECEIVE = 'RECEIVE',
  DELIVERY = 'DELIVERY',
}
