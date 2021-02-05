import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, take } from 'rxjs/operators';
import { DeliveryService } from 'src/service/delivery.service';
import { LedgerService } from 'src/service/ledger.service';
import { Delivery } from 'src/shared/model/delivery.model';
import { Ledger } from 'src/shared/model/ledger.model';

@Component({
  selector: 'app-delivery-report-sr-no',
  templateUrl: './delivery-report-sr-no.component.html',
  styleUrls: ['./delivery-report-sr-no.component.scss'],
})
export class DeliveryReportSrNoComponent implements OnInit {
  year;
  ledgerList: Ledger[];
  ledger: Ledger;
  deliveryList: Delivery[];
  delivery_total;

  searchLedger = (text$: Observable<any>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) => {
        const res =
          term.length < 2
            ? []
            : this.ledgerList
                .filter(
                  (v) =>
                    v.sr_no.indexOf(term.toLowerCase()) > -1 &&
                    v.year == this.year
                )
                .slice(0, 10);
        const names = res.map((r) => r.sr_no);
        return names;
      })
    );

  constructor(
    private ledgerService: LedgerService,
    private deliveryService: DeliveryService
  ) {
    this.year = new Date().getFullYear();
    this.getLedgerforyear(this.year);
    this.delivery_total = {
      quantity: 0,
      service_rent: 0,
      loan_amount: 0,
      loan_profit: 0,
      loan_payable: 0,
      emptyBag_quantity: 0,
      emptyBag_amount: 0,
      total: 0,
    };
  }

  ngOnInit(): void {}

  async getLedgerforyear(year: number) {
    this.ledgerService.ledgers$.pipe(take(2)).subscribe((data) => {
      this.ledgerList = data.filter((f) => f.year == year);
    });
  }

  onSelectSRNo(event) {
    this.ledger = this.ledgerList.find(
      (f) => f.sr_no == event.item && f.year == this.year
    );
    this.deliveryList = this.deliveryService._getBySrAndYear(
      event.item,
      this.year
    );

    let pre_delivery = {
      quantity: 0,
      service_rent: 0,
      loan_amount: 0,
      loan_profit: 0,
      loan_payable: 0,
      emptyBag_quantity: 0,
      emptyBag_amount: 0,
      total: 0,
    };
    if (this.deliveryList && this.deliveryList.length > 0) {
      this.deliveryList.forEach((d) => {
        pre_delivery.quantity += d.quantity;
        pre_delivery.service_rent += d.service_rent;
        pre_delivery.loan_amount += d.loan_amount;
        pre_delivery.loan_payable += d.loan_payable;
        pre_delivery.emptyBag_quantity += d.emptyBag_quantity;
        pre_delivery.emptyBag_amount += d.emptyBag_amount;
        pre_delivery.total += d.total;
      });
      this.delivery_total = pre_delivery;
      console.log(this.ledger);
      console.log(this.deliveryList);
    }
  }
}
