import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { LedgerService } from 'src/service/ledger.service';
import { UtilService } from 'src/service/util.service';
import { Loan } from 'src/shared/model/loan.model';

@Component({
  selector: 'app-loan-report',
  templateUrl: './loan-report.component.html',
  styleUrls: ['./loan-report.component.scss'],
})
export class LoanReportComponent implements OnInit {
  year: number;
  mode: string = 'day';
  date: NgbDateStruct;
  public options: any;
  public daterange: any = {};
  loanList: Loan[] = [];

  constructor(private ledgerService: LedgerService, private util: UtilService) {
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.date = this.util.convertJsDateToNgbDate(new Date());
    this.setDateRanges();
    this.onModechange('day');
  }

  setDateRanges() {
    this.daterange.endDate = new Date();
    this.daterange.startDate = new Date();
    this.daterange.startDate.setDate(this.daterange.startDate.getDate() - 30);
    const minDate = new Date();
    minDate.setDate(this.daterange.startDate.getDate() - 90);
    const maxDate = new Date();
    maxDate.setDate(this.daterange.startDate.getDate() + 23);

    this.options = {
      autoApply: true,
      locale: { format: 'DD MMM,YY' },
      minDate: minDate,
      maxDate: maxDate,
      startDate: this.daterange.startDate,
      endDate: this.daterange.endDate,
      alwaysShowCalendars: false,
    };
  }

  public selectedDate(value: any) {
    this.daterange.startDate = value.start._d as Date;
    this.daterange.endDate = value.end._d as Date;
    this.getLoanByDateRange(this.daterange.startDate, this.daterange.endDate);
  }

  async getLoanByDateRange(startDate: Date, endDate: Date) {
    this.loanList = [];
    this.ledgerService.ledgers$.pipe(take(2)).subscribe((data) => {
      const ledgerList = data.filter(
        (f) =>
          f.createdAt['seconds'] >= startDate.getTime() / 1000 &&
          f.createdAt['seconds'] <= endDate.getTime() / 1000
      );
      ledgerList.forEach((ll) => {
        this.loanList.push(new Loan(ll));
      });
      this.loanList.sort(this.util.dynamicSortObject('createdAt'));
    });
  }

  onModechange(event) {
    this.mode = event;
    switch (event) {
      case 'day':
        this.adjustDay(0);
        break;
      case 'range':
        this.getLoanByDateRange(
          this.daterange.startDate,
          this.daterange.endDate
        );
        break;
    }
  }

  adjustDay(day) {
    let date = new Date(
      this.date.year,
      this.date.month - 1,
      this.date.day + day
    );
    this.date = this.util.convertJsDateToNgbDate(date);
    const start = new Date(this.date.year, this.date.month - 1, this.date.day);
    start.setHours(0, 0, 0, 0);
    const end = new Date(this.date.year, this.date.month - 1, this.date.day);
    end.setHours(23, 59, 59, 999);
    this.getLoanByDateRange(start, end);
  }

  getDateString(): string {
    return this.date.day + '/' + this.date.month + '/' + this.date.year;
  }

  getDateRangeString(): string {
    return (
      this.util.getDateStringLocal(this.daterange.startDate) +
      ' to ' +
      this.util.getDateStringLocal(this.daterange.endDate)
    );
  }

  onPrint() {
    window.print();
  }
}
