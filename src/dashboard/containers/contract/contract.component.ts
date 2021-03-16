import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from 'src/service/inventory.service';
import { LedgerService } from 'src/service/ledger.service';
import { CompanyInfo } from 'src/shared/data/company.data';
import { Inventory } from 'src/shared/model/inventory.model';
import { Ledger } from 'src/shared/model/ledger.model';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent implements OnInit {
  id;
  company = CompanyInfo;
  ledger: Ledger;
  inventory: Inventory;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ledgerService: LedgerService,
    private inventoryService: InventoryService
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.id) {
      this.getLedger(this.id);
    }
  }

  async getLedger(id) {
    try {
      this.ledger = await this.ledgerService.get(id).toPromise();
      this.getInventory(this.ledger.sr_no);
    } catch (error) {}
  }

  async getInventory(sr_no) {
    try {
      const { docs } = await this.inventoryService
        .getInventoryList(1, 10, 'sr_no', 'asc', sr_no)
        .toPromise();
      this.inventory = docs.find((d) => d.sr_no == sr_no);
    } catch (error) {}
  }
}
