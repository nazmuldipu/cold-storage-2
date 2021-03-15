import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: '[NgTableHeader]',
  templateUrl: './ng-table-head.component.html',
  styleUrls: ['./ng-table-head.component.scss'],
})
export class NgTableHeadComponent {
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
