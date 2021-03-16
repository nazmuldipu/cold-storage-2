import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { LedgerService } from 'src/service/ledger.service';
import { UtilService } from 'src/service/util.service';
import { Ledger, LedgerPage } from 'src/shared/model/ledger.model';

@Component({
  selector: 'app-ledger-report',
  templateUrl: './ledger-report.component.html',
  styleUrls: ['./ledger-report.component.scss'],
})
export class LedgerReportComponent {
  label = 'লেজার রিপোর্ট ';
  tableTitle = '';
  ledgerPage: LedgerPage;

  constructor(
    private ledgerService: LedgerService,
    private util: UtilService
  ) {}

  async getItemByDateRange({ start, end, mode }) {
    try {
      this.ledgerPage = await this.ledgerService
        .findByDateRange(start, end)
        .toPromise();
      this.tableTitle =
        this.label + this.util.getReportDateString({ start, end, mode });
    } catch (error) {}
  }
}
