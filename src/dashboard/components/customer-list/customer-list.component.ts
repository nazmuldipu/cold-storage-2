import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Agent } from 'src/shared/model/agent.model';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent {
  @Input() customerList: Agent[];
  @Input() short: boolean;

  @Output() edit = new EventEmitter<string>();

  tableName = 'লোডিং পার্টি টেবিল';
  columns = [
    { path: '#', label: '#', className: 'font-weight-bold' },
    {
      path: 'name',
      label: 'নাম',
      searchable: true,
    },
    { path: 'father', label: 'পিতা' },
    { path: 'phone', label: 'ফোন', searchable: true },
    {
      key: '_id',
      type: 'button',
      content: (customer) => {
        return {
          classname: 'edit_link',
          text: 'Edit',
          event: { key: 'edit', id: customer._id },
        };
      },
    },
  ];

  sortColumn = { path: 'name', order: 'asc' };

  constructor() {
    Window['customerList'] = this;
  }

  onEdit(id) {
    this.edit.emit(id);
  }

  buttonEvent(event) {
    switch (event['key']) {
      case 'edit':
        this.edit.emit(event['id']);
        break;
    }
  }
}
