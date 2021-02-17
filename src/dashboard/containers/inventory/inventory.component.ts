import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from 'src/service/inventory.service';
import { UtilService } from 'src/service/util.service';
import { Inventory } from 'src/shared/model/inventory.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  year;
  sendingData = false;
  loadingData = false;
  inventoryList: Inventory[] = [];
  inventory: Inventory;
  errorMessage = '';

  constructor(
    private inventoryService: InventoryService,
    private util: UtilService,
    private router: Router
  ) {
    let dd = new Date();
    this.year = dd.getFullYear();
  }

  ngOnInit(): void {
    this.getInventoryList();
  }

  async getInventoryList() {
    this.inventoryService.inventorys$.subscribe((data) => {
      if (this.inventoryList.length != data.length) {
        const value = data
          .filter((f) => f.year == this.year)
          .sort(this.util.dynamicSortObject('date'));
        this.inventoryList = value;
      }
    });
  }

  async onCreate(event: Inventory) {
    const resp = this.inventoryList.find(
      (f) => f.year == event.year && f.sr_no == event.sr_no
    );
    if (resp) {
      this.errorMessage = 'এই এস আর নম্বর আগেথেকেই আছে।';
    } else {
      this.sendingData = true;
      Object.keys(event).forEach((key) =>
        event[key] === undefined ? delete event[key] : {}
      );
      const value = {
        ...event,
        slug: this.util.string_to_slug(event.name),
      } as Inventory;
      await this.inventoryService
        .create(value)
        .then((ref) => {
          console.log(ref);
          // this.router.navigate(['/dashboard/inventory-print', ref.id]);
          this.openInNewTab(this.router, `/dashboard/inventory-print/${ref.id}`)
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }

  openInNewTab(router: Router, namedRoute) {
    let newRelativeUrl = router.createUrlTree([namedRoute]);
    let baseUrl = window.location.href.replace(router.url, '');

    window.open(baseUrl + newRelativeUrl, '_blank');
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
