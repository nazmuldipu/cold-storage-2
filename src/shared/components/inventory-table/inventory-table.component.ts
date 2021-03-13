import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Inventory } from 'src/shared/model/inventory.model';

@Component({
  selector: 'inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss'],
})
export class InventoryTableComponent implements OnChanges {
  @Input() inventoryList: Inventory[];
  @Input() list: boolean;
  @Input() canEdit: boolean;

  @Output() edit = new EventEmitter<string>();

  tableName = 'ইনভেন্টরি টেবিল';
  columns = [
    { path: '#', label: '#', className: 'font-weight-bold' },
    {
      path: 'date',
      label: 'তারিখ',
      pipe: 'date',
      pipeArgs: 'dd/MM/yyyy',
      totalLabel: true,
    },
    { path: 'sr_no', label: 'লট নং.', searchable: true },
    { path: 'customer.name', label: 'পার্টি', searchable: true },
    { path: 'customer.father', label: 'পিতা' },
    { path: 'customer.phone', label: 'ফোন' },
    { path: 'agent.name', label: 'মারফত' },
    {
      path: 'quantity',
      label: 'পরিমাণ',
      pipe: 'currencyBd',
      className: 'text-right',
      total: true,
    },
    {
      key: '_id',
      type: 'link',
      content: (inventory) => {
        return {
          classname: 'edit_link d-print-none',
          text: 'Print',
          link: `/dashboard/inventory-print/${inventory._id}`,
        };
      },
    },
  ];

  sortColumn = { path: 'date', order: 'desc' };

  // total = 0;
  buttonEvent(event) {
    switch (event['key']) {
      case 'edit':
        this.edit.emit(event['id']);
        break;
    }
  }

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.canEdit) {
      const value = {
        key: '_id',
        type: 'button',
        content: (inv) => {
          return {
            classname: 'edit_link',
            text: 'Edit',
            link: `#`,
            event: { key: 'edit', id: inv._id },
          };
        },
      };

      this.columns.push(value);
    }
  }
}
