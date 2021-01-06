import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Inventory } from 'src/shared/model/inventory.model';

@Component({
  selector: 'inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnChanges {
  @Input() inventoryList: Inventory[];

  page = 1;
  pageSize = 8;
  searching = false;
  inventoryPage: Inventory[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.inventoryList && this.inventoryList != null) {
      this.refreshInventory();
    }
  }

  refreshInventory() {
    this.inventoryPage = this.inventoryList
      .map((chamber, i) => ({ id: i + 1, ...chamber }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
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

}
