import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';

import { IndexComponent } from './containers/index/index.component';
import { DashboardComponent } from './dashboard.component';
import { DashNavComponent } from './components/dash-nav/dash-nav.component';
import { ChamberComponent } from './containers/chamber/chamber.component';
import { ChamberFormComponent } from './components/chamber-form/chamber-form.component';
import { FloorComponent } from './containers/floor/floor.component';
import { FloorFormComponent } from './components/floor-form/floor-form.component';
import { LineComponent } from './containers/line/line.component';
import { LineFormComponent } from './components/line-form/line-form.component';
import { PocketComponent } from './containers/pocket/pocket.component';
import { PocketFormComponent } from './components/pocket-form/pocket-form.component';
import { RoleComponent } from './containers/role/role.component';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { UserComponent } from './containers/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AgentFormComponent } from './components/agent-form/agent-form.component';
import { AgentComponent } from './containers/agent/agent.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerComponent } from './containers/customer/customer.component';
import { CompanyComponent } from './containers/company/company.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { LoadingFormComponent } from './components/loading-form/loading-form.component';
import { InventoryComponent } from './containers/inventory/inventory.component';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';
import { TestComponent } from './components/test/test.component';
import { InventoryPrintComponent } from './containers/inventory-print/inventory-print.component';
import { PallotComponent } from './containers/pallot/pallot.component';
import { PallotFormComponent } from './components/pallot-form/pallot-form.component';
import { LoanComponent } from './containers/loan/loan.component';
import { LoanFormComponent } from './components/loan-form/loan-form.component';
import { LedgerComponent } from './containers/ledger/ledger.component';
import { LedgerAddComponent } from './containers/ledger-add/ledger-add.component';
import { ContractComponent } from './containers/contract/contract.component';
import { DeliveryComponent } from './containers/delivery/delivery.component';
import { DeliveryFormComponent } from './components/delivery-form/delivery-form.component';
import { DeliveryPrintComponent } from './containers/delivery-print/delivery-print.component';
import { NumberToWordsPipe } from 'src/shared/pipe/number-to-words.pipe';
import { InventoryReportComponent } from './containers/inventory-report/inventory-report.component';
import { AgentListComponent } from './components/agent-list/agent-list.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { PallotListComponent } from './components/pallot-list/pallot-list.component';
import { LedgerListComponent } from './components/ledger-list/ledger-list.component';
import { DeliveryListComponent } from './components/delivery-list/delivery-list.component';
import { NumberToBanglaPipe } from 'src/shared/pipe/number-to-bangla.pipe';
import { NumberToWordBdPipe } from 'src/shared/pipe/number-to-word-bd.pipe';
import { InventoryTableComponent } from './components/inventory-table/inventory-table.component';
import { InventoryListComponent } from './containers/inventory-list/inventory-list.component';
import { Daterangepicker } from 'ng2-daterangepicker';

export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'chamber', component: ChamberComponent },
      { path: 'floor', component: FloorComponent },
      { path: 'line', component: LineComponent },
      { path: 'pocket', component: PocketComponent },
      // { path: 'position', component: PositionComponent },
      // { path: 'chamber-type', component: ChamberTypeComponent },
      { path: 'agent', component: AgentComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'inventory-print/:id', component: InventoryPrintComponent },
      { path: 'inventory-list', component: InventoryListComponent },
      { path: 'inventory-report', component: InventoryReportComponent },
      { path: 'ledger', component: LedgerComponent },
      { path: 'ledger-add', component: LedgerAddComponent },
      { path: 'ledger-add/:id', component: LedgerAddComponent },
      { path: 'contract/:id', component: ContractComponent },
      { path: 'delivery', component: DeliveryComponent },
      { path: 'delivery-print/:id', component: DeliveryPrintComponent },
      { path: 'pallot', component: PallotComponent },
      { path: 'loan', component: LoanComponent },
      { path: 'user', component: UserComponent },
      { path: 'role', component: RoleComponent },
      { path: 'company', component: CompanyComponent },
      { path: 'test', component: TestComponent },
      { path: '', component: IndexComponent },
    ],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    IndexComponent,
    DashNavComponent,
    ChamberComponent,
    ChamberFormComponent,
    FloorComponent,
    FloorFormComponent,
    LineComponent,
    LineFormComponent,
    PocketComponent,
    PocketFormComponent,
    RoleComponent,
    RoleFormComponent,
    UserComponent,
    UserFormComponent,
    AgentFormComponent,
    AgentComponent,
    CustomerFormComponent,
    CustomerComponent,
    CompanyComponent,
    CompanyFormComponent,
    LoadingFormComponent,
    InventoryComponent,
    InventoryFormComponent,
    TestComponent,
    InventoryPrintComponent,
    PallotComponent,
    PallotFormComponent,
    LoanComponent,
    LoanFormComponent,
    LedgerComponent,
    LedgerAddComponent,
    ContractComponent,
    DeliveryComponent,
    DeliveryFormComponent,
    DeliveryPrintComponent,
    NumberToBanglaPipe,
    NumberToWordBdPipe,
    NumberToWordsPipe,
    InventoryReportComponent,
    AgentListComponent,
    CustomerListComponent,
    InventoryListComponent,
    PallotListComponent,
    LedgerListComponent,
    DeliveryListComponent,
    InventoryTableComponent
  ],
  imports: [SharedModule, Daterangepicker, RouterModule.forChild(ROUTES)],
})
export class DashboardModule { }
