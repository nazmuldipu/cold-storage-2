import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Agent, AgentPage } from 'src/shared/model/agent.model';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent {
  @Input() customerPage: AgentPage;
  @Output() edit = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<any>();

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

  sortColumn = { path: 'name', order: 'asc', limit: 8, page: 1, search: '' };

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
