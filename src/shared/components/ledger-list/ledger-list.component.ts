import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Ledger } from 'src/shared/model/ledger.model';

@Component({
  selector: 'ledger-list',
  templateUrl: './ledger-list.component.html',
  styleUrls: ['./ledger-list.component.scss'],
})
export class LedgerListComponent implements OnChanges {
  @Input() ledgerList: Ledger[];
  page = 1;
  pageSize = 8;
  ledgerPage: Ledger[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ledgerList && this.ledgerList != null) {
      this.refreshLedger();
    }
  }

  refreshLedger() {
    this.ledgerPage = this.ledgerList
      .map((line, i) => ({ id: i + 1, ...line }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  onSearch(event) {
    if (event.length >= 2) {
      this.ledgerPage = this.search(event);
    } else {
      this.refreshLedger();
    }
  }

  search(text: string): Ledger[] {
    return this.ledgerList.filter((loading) => {
      const term = text.toLowerCase();
      return (
        loading.sr_no.toLowerCase().includes(term) ||
        loading.customer.name.includes(term) ||
        loading.customer.phone.includes(term)
      );
    });
  }
}
