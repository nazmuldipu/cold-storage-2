import { Component, Input } from '@angular/core';
import { Inventory } from 'src/shared/model/inventory.model';

@Component({
  selector: 'inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss'],
})
export class InventoryTableComponent {
  @Input() inventoryList: Inventory[];
  @Input() list: boolean;

  tableName = 'Inventory Table';
  columns = [
    { path: '#', label: '#', className: 'font-weight-bold' },
    {
      path: 'date',
      label: 'Date',
      pipe: 'date',
      pipeArgs: 'dd/MM/yyyy',
      totalLabel: true,
    },
    { path: 'sr_no', label: 'SR No.', searchable: true },
    { path: 'customer.name', label: 'Customer' },
    { path: 'customer.phone', label: 'Phone', searchable: true },
    { path: 'agent.name', label: 'Agent' },
    {
      path: 'quantity',
      label: 'Quantity',
      pipe: 'currencyBd',
      className: 'text-right',
      total: true,
    },
    {
      key: '_id',
      content: (inventory) => {
        return `<a class="edit_link" href="/dashboard/inventory-print/${inventory._id}" target="_blank">Print</a>`;
      },
    },
  ];

  sortColumn = { path: 'date', order: 'desc' };

  // total = 0;

  constructor() {}
}
