import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { LedgerService } from 'src/service/ledger.service';
import { UtilService } from 'src/service/util.service';
import { Product } from 'src/shared/model/product.model';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrls: ['./product-report.component.scss'],
})
export class ProductReportComponent implements OnInit {
  year: number;
  mode: string = 'day';
  date: NgbDate;
  public options: any;
  public daterange: any = {};
  productList: Product[] = [];

  constructor(private ledgerService: LedgerService, private util: UtilService) {
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.date = this.util.convertJsDateToNgbDate(new Date());
    this.setDateRanges();
    this.onModechange('range');
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
    this.getProductByDateRange(
      this.daterange.startDate,
      this.daterange.endDate
    );
  }

  onModechange(event) {
    this.mode = event;
    switch (event) {
      case 'day':
        this.adjustDay(0);
        break;
      case 'range':
        this.getProductByDateRange(
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
    this.getProductByDateRange(start, end);
  }

  async getProductByDateRange(startDate: Date, endDate: Date) {
    this.productList = [];
    this.ledgerService.ledgers$.pipe(take(2)).subscribe((data) => {
      const ledgerList = data.filter(
        (f) =>
          f.createdAt['seconds'] >= startDate.getTime() / 1000 &&
          f.createdAt['seconds'] <= endDate.getTime() / 1000
      );
      ledgerList.forEach((ll) => {
        this.productList.push(new Product(ll));
      });
      console.log(startDate, endDate, ledgerList.length);
      this.productList.sort(this.util.dynamicSortObject('createdAt'));
    });
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
