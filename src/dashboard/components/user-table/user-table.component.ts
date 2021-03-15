import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UserPage } from 'src/shared/model/user.model';

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent{
  @Input() userPage: UserPage;

  @Output() edit = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<any>();
  // @Output() search = new EventEmitter<any>();

  tableName = 'ইউজার টেবিল';

  columns = [
    { path: 'name', label: 'Name', searchable: true },
    { path: 'phone', label: 'Phone', searchable: true },
    { path: 'email', label: 'Email', searchable: true },
    { path: 'role', label: 'Role' },
    {
      key: '_id',
      type: 'button',
      content: (user) => {
        return {
          classname: 'edit_link',
          text: 'Edit',
          link: `#`,
          event: { key: 'edit', id: user._id },
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
