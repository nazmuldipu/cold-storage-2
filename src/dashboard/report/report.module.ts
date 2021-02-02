import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Daterangepicker } from 'ng2-daterangepicker';
import { SharedModule } from 'src/shared/shared.module';

import { IndexComponent } from './containers/index/index.component';
import { InventoryReportComponent } from './containers/inventory-report/inventory-report.component';
import { LedgerReportComponent } from './containers/ledger-report/ledger-report.component';
import { LoanReportComponent } from './containers/loan-report/loan-report.component';

export const ROUTES: Routes = [
  { path: 'inventory-report', component: InventoryReportComponent },
  { path: 'loan-report', component: LoanReportComponent },
  { path: 'ledger-report', component: LedgerReportComponent },
  { path: '', component: IndexComponent },
];

@NgModule({
  declarations: [IndexComponent, InventoryReportComponent, LedgerReportComponent, LoanReportComponent],
  imports: [SharedModule, Daterangepicker,  RouterModule.forChild(ROUTES)],
})
export class ReportModule {}
