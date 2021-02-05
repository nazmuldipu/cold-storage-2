import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Daterangepicker } from 'ng2-daterangepicker';
import { SharedModule } from 'src/shared/shared.module';

import { IndexComponent } from './containers/index/index.component';
import { InventoryReportComponent } from './containers/inventory-report/inventory-report.component';
import { LedgerReportComponent } from './containers/ledger-report/ledger-report.component';
import { LoanReportComponent } from './containers/loan-report/loan-report.component';
import { LoanTableComponent } from './components/loan-table/loan-table.component';
import { ProductReportComponent } from './containers/product-report/product-report.component';
import { DeliveryReportDateComponent } from './containers/delivery-report-date/delivery-report-date.component';
import { DeliveryReportSrNoComponent } from './containers/delivery-report-sr-no/delivery-report-sr-no.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { DeliveryTableComponent } from './components/delivery-table/delivery-table.component';

export const ROUTES: Routes = [
  { path: 'inventory-report', component: InventoryReportComponent },
  { path: 'loan-report', component: LoanReportComponent },
  { path: 'ledger-report', component: LedgerReportComponent },
  { path: 'product-report', component: ProductReportComponent },
  { path: 'delivery-report-date', component: DeliveryReportDateComponent },
  { path: 'delivery-report-sr', component: DeliveryReportSrNoComponent },
  { path: '', component: IndexComponent },
];

@NgModule({
  declarations: [
    IndexComponent,
    InventoryReportComponent,
    LedgerReportComponent,
    LoanReportComponent,
    LoanTableComponent,
    ProductReportComponent,
    DeliveryReportDateComponent,
    DeliveryReportSrNoComponent,
    ProductTableComponent,
    DeliveryTableComponent,
  ],
  imports: [SharedModule, Daterangepicker, RouterModule.forChild(ROUTES)],
})
export class ReportModule {}
