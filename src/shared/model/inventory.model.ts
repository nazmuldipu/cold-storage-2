export interface Inventory {
  _id: string;
  createdAt: Date;
  date: Date;
  inventoryType: InventoryType;
  sr_no: string;
  name: string;
  slug: string;
  sub_name: string;
  phone: string;
  quantity: number;
  unit: string;
  balance: number;
  version: number;
}

export enum InventoryType {
  RECEIVE = 'RECEIVE',
  DELIVERY = 'DELIVERY',
}
