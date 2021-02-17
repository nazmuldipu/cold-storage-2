import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from 'src/service/inventory.service';
import { CompanyInfo } from 'src/shared/data/company.data';
import { Inventory } from 'src/shared/model/inventory.model';

@Component({
  selector: 'app-inventory-print',
  templateUrl: './inventory-print.component.html',
  styleUrls: ['./inventory-print.component.scss']
})
export class InventoryPrintComponent implements OnInit {
  id;
  company = CompanyInfo;
  inventory: Inventory;

  constructor(private inventoryService: InventoryService, private activatedRoute: ActivatedRoute) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.id) {
      this.getInventory(this.id);
    }
  }

  async getInventory(id) {
    this.inventoryService.inventorys$.subscribe(data => {
      this.inventory = data.find(inv => inv._id == id);
    })
  }

}
