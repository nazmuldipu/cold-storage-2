import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from 'src/shared/model/product.model';

@Component({
  selector: 'product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnChanges {
  @Input() productList: Product[];
  total;

  constructor() {
    this.total = { quantity: 0, service_amount: 0 };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.productList && this.productList.length > 0) {
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.total = { quantity: 0, service_amount: 0 };
    this.productList.forEach((prod) => {
      this.total.quantity += prod.quantity;
      this.total.service_amount += prod.service_amount;
    });
  }
}
