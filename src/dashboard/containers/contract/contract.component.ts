import { Component, OnInit } from '@angular/core';
import { CompanyInfo } from 'src/shared/data/company.data';
import { Ledger } from 'src/shared/model/ledger.model';
import { ActivatedRoute } from '@angular/router';
import { LedgerService } from 'src/service/ledger.service';
import { take } from 'rxjs/operators';
import { Inventory } from 'src/shared/model/inventory.model';
import { InventoryService } from 'src/service/inventory.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  id;
  company = CompanyInfo;
  ledger: Ledger;
  inventory: Inventory;

  constructor(private activatedRoute: ActivatedRoute, private ledgerService: LedgerService,
    private inventoryService: InventoryService) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.id) {
      this.getLedger(this.id);
    }
  }

  async getLedger(id) {
    await this.ledgerService.ledgers$.pipe(take(2)).subscribe(data => {
      this.ledger = data.find(d => d._id == id);
      if (this.ledger && this.ledger.sr_no)
        this.getInventory(this.ledger.sr_no);
    })
  }

  async getInventory(sr_no) {
    console.log('sr', sr_no);
    await this.inventoryService.inventorys$.pipe(take(2)).subscribe(data => {
      this.inventory = data.find(d => d.sr_no == sr_no);
    })
  }

}
