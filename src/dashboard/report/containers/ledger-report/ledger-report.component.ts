import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { LedgerService } from 'src/service/ledger.service';
import { UtilService } from 'src/service/util.service';
import { Ledger } from 'src/shared/model/ledger.model';

@Component({
  selector: 'app-ledger-report',
  templateUrl: './ledger-report.component.html',
  styleUrls: ['./ledger-report.component.scss'],
})
export class LedgerReportComponent {
  label = 'Ledger Report';
  tableTitle = '';
  ledgerList: Ledger[] = [];

  constructor(
    private ledgerService: LedgerService,
    private util: UtilService
  ) {}

  async getItemByDateRange({ start, end, mode }) {
    this.ledgerService.ledgers$.pipe(take(2)).subscribe((data) => {
      this.ledgerList = data.filter(
        (f) =>
          f.createdAt['seconds'] >= start.getTime() / 1000 &&
          f.createdAt['seconds'] <= end.getTime() / 1000
      );
      this.ledgerList.sort(this.util.dynamicSortObject('createdAt'));
      this.tableTitle =
        this.label +
        ' for ' +
        this.util.getReportDateString({ start, end, mode });
    });
  }
}
