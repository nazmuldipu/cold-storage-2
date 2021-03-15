import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Inventory, InventoryPage } from 'src/shared/model/inventory.model';

@Component({
  selector: 'inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss'],
})
export class InventoryTableComponent implements OnChanges {
  @Input() inventoryPage: InventoryPage;
  @Input() canEdit: boolean;

  @Output() edit = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<any>();

  tableName = 'ইনভেন্টরি টেবিল';
  columns = [
    { path: 'vouchar_no', label: 'No.', className: 'font-weight-bold' },
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

  sortColumn = { path: 'vouchar_no', order: 'asc', limit: 8, page: 1, search: '' };
  pushCol = 0; //sermaphorse

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
      
      if (!this.pushCol) {
        this.columns.push(value);
        this.pushCol = 1;
      }
    }
  }

  buttonEvent(event) {
    switch (event['key']) {
      case 'edit':
        this.edit.emit(event['id']);
        break;
    }
  }

  onRefresh(event) {
    this.sortColumn = { ...event };
    this.refresh.emit({ sort: event.path, ...event });
  }
}
