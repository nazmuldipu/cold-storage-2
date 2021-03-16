import { Component, OnInit } from '@angular/core';
import { LedgerService } from 'src/service/ledger.service';
import { Ledger, LedgerPage } from 'src/shared/model/ledger.model';

@Component({
  selector: 'app-ledger-add',
  templateUrl: './ledger-add.component.html',
  styleUrls: ['./ledger-add.component.scss'],
})
export class LedgerAddComponent implements OnInit {
  loading = false;
  errorMessage = '';

  ledger: Ledger;
  ledgerPage: LedgerPage;

  constructor(private ledgerService: LedgerService) {}

  ngOnInit(): void {
    this.getLedgerList();
  }

  async getLedgerList(
    page: number = 1,
    limit: number = 8,
    sort: string = 'vouchar_no',
    order: string = 'asc',
    param: string = ''
  ) {
    try {
      this.loading = true;
      this.ledgerPage = await this.ledgerService
        .getLedgerList(page, limit, sort, order, param)
        .toPromise();
      this.loading = false;
    } catch (error) {}
  }

  refreshData({ page, limit, sort, order, search }) {
    this.getLedgerList(page, limit, sort, order, search);
  }

  async onCreate(event: Ledger) {
    try {
      this.loading = true;
      const resp = await this.ledgerService.create(event).toPromise();
      this.ledgerPage.docs.push(resp);
      // this.openInNewTab(this.router, `/dashboard/inventory-print/${resp._id}`);
      this.loading = false;
    } catch (err) {
      this.errorMessage = err;
    }
  }

  async onUpdate(ledger: Ledger) {
    try {
      this.loading = true;
      this.errorMessage = '';
      const resp = await this.ledgerService
        .update(this.ledger._id, ledger)
        .toPromise();
      this.getLedgerList();
      this.loading = false;
    } catch (err) {
      this.errorMessage = err;
    }
  }
}
