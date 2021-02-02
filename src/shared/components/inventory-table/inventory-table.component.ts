import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Inventory } from 'src/shared/model/inventory.model';

@Component({
  selector: 'inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss'],
})
export class InventoryTableComponent implements OnChanges {
  @Input() inventoryList: Inventory[];
  @Input() list: boolean;

  page = 1;
  pageSize = 8;
  searching = false;
  inventoryPage: Inventory[] = [];
  total = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.inventoryList && this.inventoryList != null) {
      this.refreshInventory();
      this.calculateTotalQuantity();
    }
    if (changes.list) {
      this.refreshInventory();
    }
  }

  refreshInventory() {
    if (this.list) {
      this.inventoryPage = this.inventoryList;
    } else {
      this.inventoryPage = this.inventoryList
        .map((chamber, i) => ({ id: i + 1, ...chamber }))
        .slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
    }
  }

  onSearch(event) {
    if (event.length >= 2) {
      this.searching = true;
      this.inventoryPage = this.search(event);
    } else {
      this.searching = false;
      this.refreshInventory();
    }
  }

  search(text: string): Inventory[] {
    return this.inventoryList.filter((loading) => {
      const term = text.toLowerCase();
      return (
        loading.sr_no.toLowerCase().includes(term) ||
        loading.customer.phone.includes(term)
      );
    });
  }

  calculateTotalQuantity() {
    let t = 0;
    this.inventoryList.forEach((f) => {
      t += f.quantity;
    });
    this.total = t;
  }
}
