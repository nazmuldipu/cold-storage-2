import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { LedgerService } from 'src/service/ledger.service';
import { UtilService } from 'src/service/util.service';
import { Loan } from 'src/shared/model/loan.model';

@Component({
  selector: 'app-loan-report',
  templateUrl: './loan-report.component.html',
  styleUrls: ['./loan-report.component.scss'],
})
export class LoanReportComponent {
  label = 'Loan Report';
  tableTitle = '';
  loanList: Loan[] = [];

  constructor(
    private ledgerService: LedgerService,
    private util: UtilService
  ) {}

  async getItemByDateRange({ start, end, mode }) {
    this.loanList = [];
    this.ledgerService.ledgers$.pipe(take(2)).subscribe((data) => {
      const ledgerList = data.filter(
        (f) =>
          f.createdAt['seconds'] >= start.getTime() / 1000 &&
          f.createdAt['seconds'] <= end.getTime() / 1000
      );
      ledgerList.forEach((ll) => {
        this.loanList.push(new Loan(ll));
      });
      this.loanList.sort(this.util.dynamicSortObject('createdAt'));
      this.tableTitle =
        this.label +
        ' for ' +
        this.util.getReportDateString({ start, end, mode });
    });
  }
}
