import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PageInfo } from './../../model/pageinfo.model';

@Component({
  selector: 'ng-table',
  templateUrl: './ng-table.component.html',
  styleUrls: ['./ng-table.component.scss'],
})
export class NgTableComponent implements OnChanges {
  @Input() tableName: string; // Name of Table
  @Input() columns; // List of columns for table
  @Input() data: PageInfo; // Table data
  @Input() sortColumn;

  @Output() btnEvent = new EventEmitter<any>();
  @Output() refresh = new EventEmitter<any>();
  @Output() search = new EventEmitter<any>();

  total = [];
  searchableArray = [];
  searchQuery = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns && this.columns != null) {
      this.columns.forEach((element) => {
        if (element.searchable) {
          this.searchableArray.push({
            path: element.path,
            label: element.label,
          });
        }
      });
    }
  }

  handleSort(event) {
    this.refresh.emit(event);
  }

  handleEvent(event) {
    this.btnEvent.emit(event);
  }

  handlePagination(event) {
    this.refresh.emit({ ...this.sortColumn, page: event });
  }

  handlePageSize(event) {
    this.refresh.emit({ ...this.sortColumn, limit: event });
  }

  handleSearch() {
    if (this.searchQuery.length > 2) {
      this.search.emit(this.searchQuery);
    }
  }

  calculateColumnTotal() {
    const total = [];
    this.columns.forEach((col) => {
      if (col.total) {
        let colTotal = 0;
        this.data.docs.forEach((d) => {
          colTotal += parseInt(d[col.path]);
        });
        total.push({ path: col.path, total: colTotal, pipe: col.pipe });
      } else if (col.totalLabel) {
        total.push({ path: col.path, label: 'Total' });
      }
    });
    this.total = [...total];
  }

  getSearchPlaceHolderText() {
    let text = '';
    for (let i = 0; i < this.searchableArray.length; i++) {
      text += this.searchableArray[i].label;
      if (i != this.searchableArray.length - 1) {
        text += '/';
      }
    }
    return text;
  }
}
