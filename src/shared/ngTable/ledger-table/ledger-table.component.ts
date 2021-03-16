import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { LedgerPage } from 'src/shared/model/ledger.model';

@Component({
  selector: 'ledger-table',
  templateUrl: './ledger-table.component.html',
  styleUrls: ['./ledger-table.component.scss'],
})
export class LedgerTableComponent implements OnChanges {
  @Input() ledgerPage: LedgerPage;

  @Output() refresh = new EventEmitter<any>();

  tableName = 'লেজার টেবিল';
  columns = [
    { path: 'sr_no', label: 'লট নং.', searchable: true },
    {
      path: 'customer.name',
      label: 'পার্টি',
      searchable: true,
      totalLabel: true,
    },
    { path: 'loan_payable', label: 'পরিমান' },
    { path: 'service_amount', label: 'রেট' },
    { path: 'emptyBag_amount', label: 'প্রদেয়', className: 'text-right' },
    {
      path: 'total_amount',
      label: 'মোট',
      className: 'text-right',
      pipe: 'currencyBd',
      total: true,
    },
    {
      key: '_id',
      type: 'link',
      content: (inventory) => {
        return {
          classname: 'edit_link d-print-none',
          text: 'Print',
          link: `/dashboard/contract/${inventory._id}`,
        };
      },
    },
  ];

  sortColumn = {
    path: 'sr_no',
    order: 'asc',
    limit: 8,
    page: 1,
    search: '',
  };

  total = [];
  searchableArray = [
    {
      path: 'sr_no',
      label: 'SR #',
    },
  ];
  searchQuery = '';

  constructor() {}

  onSearchSubmit() {
    if (this.searchQuery.length > 2) {
      this.sortColumn['search'] = this.searchQuery;
    } else {
      this.sortColumn['search'] = '';
    }
    this.refresh.emit(this.sortColumn);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ledgerPage && this.ledgerPage != null) {
      this.calculateColumnTotal();
    }
  }

  onRefresh(event) {
    this.sortColumn = { ...event };
    this.refresh.emit({ sort: event.path, ...event });
  }

  handleSort(event) {
    this.refresh.emit(event);
  }

  handlePageSize(event) {
    this.sortColumn = { ...this.sortColumn, limit: event };
    this.refresh.emit(this.sortColumn);
  }

  handlePagination(event) {
    this.sortColumn = { ...this.sortColumn, page: event };
    this.refresh.emit(this.sortColumn);
  }

  calculateColumnTotal() {
    const total = [];
    this.columns.forEach((col) => {
      if (col.total) {
        let colTotal = 0;
        this.ledgerPage.docs.forEach((d) => {
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
