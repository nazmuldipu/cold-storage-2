import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { LedgerService } from 'src/service/ledger.service';
import { UtilService } from 'src/service/util.service';
import { Ledger } from 'src/shared/model/ledger.model';

@Component({
  selector: 'app-ledger-report',
  templateUrl: './ledger-report.component.html',
  styleUrls: ['./ledger-report.component.scss'],
})
export class LedgerReportComponent implements OnInit {
  year: number;
  mode: string = 'day';
  date: NgbDateStruct;
  public options: any;
  public daterange: any = {};
  ledgerList: Ledger[] = [];

  constructor(private ledgerService: LedgerService, private util: UtilService) {
    this.year = new Date().getFullYear();
    this.date = this.util.convertJsDateToNgbDate(new Date());
  }

  ngOnInit(): void {
    this.setDateRanges();
  }

  setDateRanges() {
    this.daterange.endDate = new Date();
    this.daterange.startDate = new Date();
    this.daterange.startDate.setDate(this.daterange.startDate.getDate() - 20);
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
    this.getLedgerByDateRange(this.daterange.startDate, this.daterange.endDate);
  }

  async getLedgerByDateRange(startDate: Date, endDate: Date) {
    this.ledgerService.ledgers$.pipe(take(2)).subscribe((data) => {
      this.ledgerList = data.filter(
        (f) =>
          f.createdAt['seconds'] >= startDate.getTime() / 1000 &&
          f.createdAt['seconds'] <= endDate.getTime() / 1000
      );
      this.ledgerList.sort(this.util.dynamicSortObject('createdAt'));
    });
  }

  onModechange(event) {
    this.mode = event;
    switch (event) {
      case 'day':
        this.adjustDay(0);
        break;
      case 'range':
        this.getLedgerByDateRange(
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
    this.getLedgerByDateRange(start, end);
  }

  getDateString():string{
    return this.date.day + '/' + this.date.month + '/' + this.date.year
  }

  getDateRangeString():string{
    return this.util.getDateStringLocal(this.daterange.startDate) + ' to ' + this.util.getDateStringLocal(this.daterange.endDate);
  }

  onPrint() {
    window.print();
  }
}
