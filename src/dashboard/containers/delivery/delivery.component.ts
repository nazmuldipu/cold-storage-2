import { Component, OnInit } from '@angular/core';
import { DeliveryService } from 'src/service/delivery.service';
import { LedgerService } from 'src/service/ledger.service';
import { Ledger } from 'src/shared/model/ledger.model';
import { take } from 'rxjs/operators';
import { Delivery } from 'src/shared/model/delivery.model';
import { Router } from '@angular/router';

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

  constructor(private deliveryService: DeliveryService, private ledgerService: LedgerService, private router: Router) {
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
    })
  }

  async onCreate(event: Delivery) {
    this.sendingData = true;
    await this.deliveryService
      .create(event)
      .then((ref) => {
        this.router.navigate(['dashboard/delivery-print', ref.id])
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
}
