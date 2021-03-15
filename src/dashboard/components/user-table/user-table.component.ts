import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { UserPage } from 'src/shared/model/user.model';

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnChanges {
  @Input() userPage: UserPage;

  @Output() edit = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<any>();

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

  sortColumn = { path: 'name', order: 'asc', limit: 8, page: 1 };

  buttonEvent(event) {
    console.log(event);
  }

  onRefresh(event) {
    this.sortColumn = { ...event };
    this.refresh.emit({ sort: event.path, ...event });
  }

  onSearch(event) {
    console.log(event);
  }

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {}
}
