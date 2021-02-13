import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'AppTable',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input() tableName: string; // Name of Table
  @Input() columns; // List of columns for table
  @Input() list: boolean = false; // List or Paginate view
  @Input() sortColumn; // Sort By column info ({ path: 'date', order: 'desc' })
  @Input() data; // Table data

  @Output() btnEvent = new EventEmitter<any>();

  page = 1;
  pageSize = 8; // Default page size
  searchQuery = ''; // Table search variable
  totalCount = 0; // Total number of element
  dataPage = []; // data to show into table body
  searchableArray = []; // create searcable column list
  total = []; // table column total

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
    this.refreshData();
  }

  refreshData() {
    let filtered = this.data;
    //Apply Search query
    if (this.searchQuery)
      filtered = this.data.filter((m) => {
        let found = false;
        this.searchableArray.forEach((s) => {
          const value = _.get(m, s.path)
            .toLowerCase()
            .startsWith(this.searchQuery.toLowerCase());
          if (value) found = true;
        });
        return found;
      });

    //Sort Data
    filtered = _.orderBy(
      filtered,
      [this.sortColumn.path],
      [this.sortColumn.order]
    );

    //if list view false then paginate
    if (!this.list)
      this.dataPage = this.paginateData(filtered, this.page, this.pageSize);
    else this.dataPage = filtered;

    this.totalCount = filtered.length;
    this.calculateColumnTotal();
  }

  paginateData(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
  }

  handleSort(event) {
    this.sortColumn = event;
    this.refreshData();
  }

  handleEvent(event){
    this.btnEvent.emit(event);
  }

  calculateColumnTotal() {
    const total = [];
    this.columns.forEach((col) => {
      if (col.total) {
        let colTotal = 0;
        this.dataPage.forEach((d) => {
          colTotal += d[col.path];
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
