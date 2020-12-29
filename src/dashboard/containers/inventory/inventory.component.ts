import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/service/inventory.service';
import { UtilService } from 'src/service/util.service';
import { Inventory } from 'src/shared/model/inventory.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  sendingData = false;
  loadingData = false;
  inventoryList: Inventory[] = [];
  inventory: Inventory;

  page = 1;
  pageSize = 8;
  inventoryPage: Inventory[] = [];
  errorMessage = '';

  constructor(private inventoryService: InventoryService, private util: UtilService) {}

  ngOnInit(): void {
    this.getInventoryList();
  }

  async getInventoryList() {
    this.inventoryService.inventorys$.subscribe((data) => {
      this.inventoryList = data;
      this.inventoryList.sort(this.util.dynamicSortObject('date'));
      this.refreshInventory();
    });
  }

  refreshInventory() {
    this.inventoryPage = this.inventoryList
      .map((chamber, i) => ({ id: i + 1, ...chamber }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  async onCreate(event: Inventory) {
    this.sendingData = true;
    const value = {
      ...event,
      slug: this.util.string_to_slug(event.name),
    } as Inventory;
    await this.inventoryService
      .create(value)
      .then((ref) => {
        console.log(ref);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
  async onUpdate(event: Inventory) {
    this.sendingData = true;
    const value = {
      ...event,
      slug: event.name.toLowerCase(),
      createdAt: this.inventory.createdAt,
    };
    await this.inventoryService
      .update(this.inventory._id, value)
      .then(() => {
        this.sendingData = false;
      })
      .catch((error) => {
        this.sendingData = false;
        (this.errorMessage = 'Group Updating ERROR ! '), error;
      });
    this.clear();
  }

  async onDelete(id) {
    this.sendingData = true;
    if (confirm('Are you sure to delete')) {
      await this.inventoryService
        .delete(id)
        .then(() => {
          this.sendingData = false;
        })
        .catch((error) => {
          this.sendingData = false;
          (this.errorMessage = 'Inventory Deleting ERROR ! '), error;
        });
      this.clear();
    }
  }

  onEdit(id) {
    this.inventory = this.inventoryList.find((cp) => cp._id === id);
  }

  clear() {
    this.inventory = null;
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }
}
