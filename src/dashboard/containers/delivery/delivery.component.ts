import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/service/delivery.service';
import { LedgerService } from 'src/service/ledger.service';
import { Ledger } from 'src/shared/model/ledger.model';
import { take } from 'rxjs/operators';
import { Delivery } from 'src/shared/model/delivery.model';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  year;
  sendingData = false;
  ledgerList: Ledger[] = [];
  deliveryList: Delivery[] = [];

  page = 1;
  pageSize = 8;
  deliveryPage: Delivery[] = [];

  constructor(private deliveryService: DeliveryService, private ledgerService: LedgerService) {
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.getDeliveryListbyYear(this.year);
    this.getLedgerforyear(this.year);
  }

  async getLedgerforyear(year: number) {
    this.ledgerService.ledgers$.pipe(take(2)).subscribe(data => {
      this.ledgerList = data.filter(f => f.year == year);
    })
  }

  async getDeliveryListbyYear(year: number) {
    this.deliveryService.deliverys$.subscribe(data => {
      this.deliveryList = data.filter(f => f.year == year);
      this.refreshDelivery();
    })
  }

  refreshDelivery() {
    this.deliveryPage = this.deliveryList
      .map((delivery, i) => ({ id: i + 1, ...delivery }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  async onCreate(event: Delivery) {
    this.sendingData = true;
    await this.deliveryService
      .create(event)
      .then((ref) => {
        console.log(ref);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
}
