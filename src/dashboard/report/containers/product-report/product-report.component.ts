import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { LedgerService } from 'src/service/ledger.service';
import { UtilService } from 'src/service/util.service';
import { Product } from 'src/shared/model/product.model';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrls: ['./product-report.component.scss'],
})
export class ProductReportComponent {
  label = 'Product Report';
  tableTitle = '';
  productList: Product[] = [];

  constructor(
    private ledgerService: LedgerService,
    private util: UtilService
  ) {}

  async getItemByDateRange({ start, end, mode }) {
    this.productList = [];
    this.ledgerService.ledgers$.pipe(take(2)).subscribe((data) => {
      const ledgerList = data.filter(
        (f) =>
          f.createdAt['seconds'] >= start.getTime() / 1000 &&
          f.createdAt['seconds'] <= end.getTime() / 1000
      );
      ledgerList.forEach((ll) => {
        this.productList.push(new Product(ll));
      });
      this.productList.sort(this.util.dynamicSortObject('createdAt'));

      this.tableTitle =
        this.label +
        ' for ' +
        this.util.getReportDateString({ start, end, mode });
    });
  }
}
