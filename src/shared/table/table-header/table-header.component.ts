import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: '[TableHeader]',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
})
export class TableHeaderComponent {
  @Input() tableName;
  @Input() columns;
  @Input() sortColumn;
  @Output() onSort = new EventEmitter<any>();

  raiseSort(path) {
    const sortColumn = { ...this.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.onSort.emit(sortColumn);
  }

  renderSortIcon(column) {
    if (column.path != this.sortColumn.path) return null;
    if (this.sortColumn.order === 'asc') return `fa-sort-asc`;
    return `fa-sort-desc`;
  }
}
