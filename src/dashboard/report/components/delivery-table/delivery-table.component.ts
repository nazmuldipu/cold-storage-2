import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Delivery } from 'src/shared/model/delivery.model';

@Component({
  selector: 'delivery-table',
  templateUrl: './delivery-table.component.html',
  styleUrls: ['./delivery-table.component.scss']
})
export class DeliveryTableComponent implements OnChanges {
  @Input() deliveryList: Delivery[];
  total;

  constructor() {
    this.total = { quantity:0, service_rent: 0, emptyBag_amount: 0, loan_payable: 0, total: 0 };
   }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.deliveryList && this.deliveryList.length > 0) {
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.total = {quantity:0, service_rent: 0, emptyBag_amount: 0, loan_payable: 0, total: 0 };
    this.deliveryList.forEach((del:Delivery) => {
      this.total.quantity += del.quantity;
      this.total.service_rent += del.service_rent;
      this.total.emptyBag_amount += del.emptyBag_amount;
      this.total.loan_payable +=  del.loan_payable;
      this.total.total +=  del.total;
    });
  }
}
