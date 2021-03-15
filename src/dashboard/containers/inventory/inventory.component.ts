import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from 'src/service/inventory.service';
import { UtilService } from 'src/service/util.service';
import { Inventory } from 'src/shared/model/inventory.model';
import { InventoryPage } from './../../../shared/model/inventory.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  year;
  sendingData = false;
  loadingData = false;
  // inventoryList: Inventory[] = [];
  inventoryPage: InventoryPage;
  totalCount = 0;

  inventory: Inventory;
  errorMessage = '';

  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) {
    let dd = new Date();
    this.year = dd.getFullYear();
  }

  ngOnInit(): void {
    this.getInventoryList();
    this.getTotalDocumentSize();
  }

  async getInventoryList(
    page: number = 1,
    limit: number = 8,
    sort: string = 'vouchar_no',
    order: string = 'asc',
    param: string = ''
  ) {
    try {
      this.loadingData = true;
      this.inventoryPage = await this.inventoryService
        .getInventoryList(page, limit, sort, order, param)
        .toPromise();
      this.loadingData = false;
    } catch (error) {}
  }

  async getTotalDocumentSize() {
    try {
      const { count } = await this.inventoryService.count().toPromise();
      this.totalCount = count;
    } catch (err) {
      this.errorMessage = err;
    }
  }

  refreshData({ page, limit, sort, order, search }) {
    this.getInventoryList(page, limit, sort, order, search);
  }

  onEdit(id) {
    this.inventory = this.inventoryPage.docs.find((cp) => cp._id === id);
  }

  async onCreate(event: Inventory) {
    try {
      this.sendingData = true;
      const resp = await this.inventoryService.create(event).toPromise();
      console.log(resp);
      this.inventoryPage.docs.push(resp);
      this.getTotalDocumentSize();
      this.openInNewTab(this.router, `/dashboard/inventory-print/${resp._id}`);
      this.sendingData = false;
    } catch (err) {
      this.errorMessage = err;
    }
  }

  openInNewTab(router: Router, namedRoute) {
    let newRelativeUrl = router.createUrlTree([namedRoute]);
    let baseUrl = window.location.href.replace(router.url, '');
    window.open(baseUrl + newRelativeUrl, '_blank');
  }

  async onUpdate(event: Inventory) {
    try {
      this.sendingData = true;
      this.errorMessage = '';
      const resp = await this.inventoryService
        .update(this.inventory._id, event)
        .toPromise();
      this.getInventoryList();
      this.sendingData = false;
    } catch (err) {
      this.errorMessage = err;
    }
  }

  async onDelete(id) {
    if (confirm('Are you sure to delete')) {
      try {
        const resp = await this.inventoryService.delete(id).toPromise();
        const index = this.inventoryPage.docs.findIndex((f) => f._id === id);
        if (index > -1) {
          this.inventoryPage.docs.splice(index, 1);
        }
      } catch (err) {
        this.errorMessage = err;
      }
      this.clear();
    }
  }

  clear() {
    this.inventory = null;
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }
}
