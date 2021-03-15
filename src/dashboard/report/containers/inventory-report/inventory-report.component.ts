import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { InventoryService } from 'src/service/inventory.service';
import { UtilService } from 'src/service/util.service';
import { Inventory } from 'src/shared/model/inventory.model';
import { InventoryPage } from './../../../../shared/model/inventory.model';

@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.scss'],
})
export class InventoryReportComponent {
  label = ' ইনভেন্টরি রিপোর্ট,  ';
  tableTitle = '';
  inventoryPage: InventoryPage;

  constructor(
    private util: UtilService,
    private inventoryService: InventoryService
  ) {}

  async getItemByDateRange({ start, end, mode }) {
    try {
      this.inventoryPage = await this.inventoryService
        .findByDateRange(start, end)
        .toPromise();
      this.tableTitle =
      this.label + this.util.getReportDateString({ start, end, mode }) ;
    } catch (error) {}
    // this.inventoryService.inventorys$.pipe(take(2)).subscribe((data) => {
    //   this.inventoryList = data.filter(
    //     (f) =>
    //       f.date['seconds'] >= start.getTime() / 1000 &&
    //       f.date['seconds'] <= end.getTime() / 1000
    //   );
    //   this.inventoryList.sort(this.util.dynamicSortObject('sr_no'));
    //   this.tableTitle =
    //     this.label +
    //     ' for ' +
    //     this.util.getReportDateString({ start, end, mode });
    // });
  }
}
