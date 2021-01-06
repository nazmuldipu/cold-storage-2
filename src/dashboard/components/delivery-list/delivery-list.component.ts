import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Ledger } from 'src/shared/model/ledger.model';
import { Delivery } from 'src/shared/model/delivery.model';

@Component({
  selector: 'delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnChanges {
  @Input() deliveryList: Delivery[];

  page = 1;
  pageSize = 8;
  deliveryPage: Delivery[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.deliveryList && this.deliveryList != null) {
      this.refreshDelivery();
    }
  }

  refreshDelivery() {
    this.deliveryPage = this.deliveryList
      .map((delivery, i) => ({ id: i + 1, ...delivery }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  onSearch(event) {
    if (event.length >= 2) {
      console.log(event, event.length);
      this.deliveryPage = this.search(event);
    } else {
      this.refreshDelivery();
    }
  }

  search(text: string): Delivery[] {
    return this.deliveryList.filter((loading) => {
      const term = text.toLowerCase();
      return (
        loading.sr_no.toLowerCase().includes(term) ||
        loading.customer.name.includes(term) ||
        loading.customer.phone.includes(term)
      );
    });
  }

}
