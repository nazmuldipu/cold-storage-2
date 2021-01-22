import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { InventoryService } from 'src/service/inventory.service';
import { UtilService } from 'src/service/util.service';
import { Inventory } from 'src/shared/model/inventory.model';

@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.scss'],
})
export class InventoryReportComponent implements OnInit {
  year;
  date: NgbDateStruct;
  mode: string = 'day';
  inventoryList: Inventory[] = [];
  filteredInventoryList: Inventory[] = [];
  total = 0;
  // company_info = CompanyInfo;
  // agentList: Agent[] = [];
  // customerList: Agent[] = [];
  public options: any;
  public daterange: any = {};

  constructor(
    private inventoryService: InventoryService,
    private util: UtilService
  ) {
    this.year = new Date().getFullYear();
    this.date = this.util.convertJsDateToNgbDate(new Date());
  }

  ngOnInit(): void {
    this.setDateRanges();
    // this.getInventoryByYear(this.year);
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

  public selectedDate(value: any) {
    this.daterange.startDate = value.start._d as Date;
    this.daterange.endDate = value.end._d as Date;
    console.log(this.daterange);
    this.getInventoryByDateRange(
      this.daterange.startDate,
      this.daterange.endDate
    );
  }

  async getInventoryByDateRange(startDate: Date, endDate: Date) {
    this.inventoryService.inventorys$.pipe(take(2)).subscribe((data) => {
      this.inventoryList = data.filter(
        (f) =>
          f.date['seconds'] >= startDate.getTime() / 1000 &&
          f.date['seconds'] <= endDate.getTime() / 1000
      );
      this.inventoryList.sort(this.util.dynamicSortObject('sr_no'));
    });
  }

  adjustDay(day) {
    let date = new Date(
      this.date.year,
      this.date.month - 1,
      this.date.day + day
    );
    this.date = this.util.convertJsDateToNgbDate(date);
    console.log(date);
    const start = new Date(this.date.year, this.date.month - 1, this.date.day);
    start.setHours(0, 0, 0, 0);
    const end = new Date(this.date.year, this.date.month - 1, this.date.day);
    end.setHours(23, 59, 59, 999);
    this.getInventoryByDateRange(start, end);
  }  

  onModechange(event) {
    this.mode = event;
    switch (event) {
      case 'day':
        this.adjustDay(0);
        break;
      case 'range':
        this.getInventoryByDateRange(
          this.daterange.startDate,
          this.daterange.endDate
        );
        break;
    }
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
