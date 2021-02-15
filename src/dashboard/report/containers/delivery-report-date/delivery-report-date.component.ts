import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { DeliveryService } from 'src/service/delivery.service';
import { UtilService } from 'src/service/util.service';
import { Delivery } from 'src/shared/model/delivery.model';

@Component({
  selector: 'app-delivery-report-date',
  templateUrl: './delivery-report-date.component.html',
  styleUrls: ['./delivery-report-date.component.scss'],
})
export class DeliveryReportDateComponent {
  label = 'Delivery Report';
  tableTitle = '';
  deliveryList: Delivery[] = [];

  constructor(
    private deliveryService: DeliveryService,
    private util: UtilService
  ) {}

  async getItemByDateRange({ start, end, mode }) {
    this.deliveryList = [];
    this.deliveryService.deliverys$.pipe(take(2)).subscribe((data) => {
      const deliveries = data.filter(
        (f) =>
          f.createdAt['seconds'] >= start.getTime() / 1000 &&
          f.createdAt['seconds'] <= end.getTime() / 1000
      );
      this.deliveryList = deliveries;
      
      this.deliveryList.sort(this.util.dynamicSortObject('createdAt'));

      this.tableTitle =
        this.label +
        ' for ' +
        this.util.getReportDateString({ start, end, mode });
    });
  }
}
