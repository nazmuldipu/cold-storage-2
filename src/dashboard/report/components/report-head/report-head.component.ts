import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from 'src/service/util.service';

@Component({
  selector: 'report-head',
  templateUrl: './report-head.component.html',
  styleUrls: ['./report-head.component.scss'],
})
export class ReportHeadComponent implements OnInit {
  @Input() label: string;
  @Output() dateRange = new EventEmitter<any>();

  year;
  total = 0;
  date: NgbDateStruct;
  mode: string = 'day';
  itemList: any[] = [];
  filteredItemList: any[] = [];
  public options: any;
  public daterange: any = {};

  constructor(public util: UtilService) {
    this.year = new Date().getFullYear();
    this.date = util.convertJsDateToNgbDate(new Date());
    this.setDateRanges();
  }

  ngOnInit(): void {
    this.onModechange(this.mode);
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

  onModechange(event) {
    this.mode = event;
    switch (event) {
      case 'day':
        this.adjustDay(0);
        break;
      case 'range':
        this.getItemByDateRange(
          this.daterange.startDate,
          this.daterange.endDate,
          event
        );
        break;
    }
  }

  selectedDate(value: any) {
    this.daterange.startDate = value.start._d as Date;
    this.daterange.endDate = value.end._d as Date;
    this.getItemByDateRange(
      this.daterange.startDate,
      this.daterange.endDate,
      this.mode
    );
  }

  getItemByDateRange(startDate: Date, endDate: Date, mode: string) {
    this.dateRange.emit({ start: startDate, end: endDate, mode });
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
    this.getItemByDateRange(start, end, this.mode);
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
