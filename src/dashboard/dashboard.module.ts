import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Daterangepicker } from 'ng2-daterangepicker';
import { SharedModule } from 'src/shared/shared.module';

import { AgentFormComponent } from './components/agent-form/agent-form.component';
import { AgentListComponent } from './components/agent-list/agent-list.component';
import { ChamberFormComponent } from './components/chamber-form/chamber-form.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { DashNavComponent } from './components/dash-nav/dash-nav.component';
import { DeliveryFormComponent } from './components/delivery-form/delivery-form.component';
import { DeliveryListComponent } from './components/delivery-list/delivery-list.component';
import { FloorFormComponent } from './components/floor-form/floor-form.component';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';
import { LineFormComponent } from './components/line-form/line-form.component';
import { LoadingFormComponent } from './components/loading-form/loading-form.component';
import { LoanFormComponent } from './components/loan-form/loan-form.component';
import { PallotFormComponent } from './components/pallot-form/pallot-form.component';
import { PallotListComponent } from './components/pallot-list/pallot-list.component';
import { PocketFormComponent } from './components/pocket-form/pocket-form.component';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { TestComponent } from './components/test/test.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AgentComponent } from './containers/agent/agent.component';
import { ChamberComponent } from './containers/chamber/chamber.component';
import { CompanyComponent } from './containers/company/company.component';
import { ContractComponent } from './containers/contract/contract.component';
import { CustomerComponent } from './containers/customer/customer.component';
import { DeliveryPrintComponent } from './containers/delivery-print/delivery-print.component';
import { DeliveryComponent } from './containers/delivery/delivery.component';
import { FloorComponent } from './containers/floor/floor.component';
import { IndexComponent } from './containers/index/index.component';
import { InventoryListComponent } from './containers/inventory-list/inventory-list.component';
import { InventoryPrintComponent } from './containers/inventory-print/inventory-print.component';
import { InventoryComponent } from './containers/inventory/inventory.component';
import { LedgerAddComponent } from './containers/ledger-add/ledger-add.component';
import { LineComponent } from './containers/line/line.component';
import { LoanComponent } from './containers/loan/loan.component';
import { PallotComponent } from './containers/pallot/pallot.component';
import { PocketComponent } from './containers/pocket/pocket.component';
import { RoleComponent } from './containers/role/role.component';
import { UserComponent } from './containers/user/user.component';
import { DashboardComponent } from './dashboard.component';
import { UserTableComponent } from './components/user-table/user-table.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'report',
        loadChildren: () =>
          import('./report/report.module').then((m) => m.ReportModule),
      },

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
      // { path: 'ledger', component: LedgerComponent },
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
    LedgerAddComponent,
    ContractComponent,
    DeliveryComponent,
    DeliveryFormComponent,
    DeliveryPrintComponent,
    AgentListComponent,
    CustomerListComponent,
    InventoryListComponent,
    PallotListComponent,
    DeliveryListComponent,
    UserTableComponent,
  ],
  imports: [SharedModule, Daterangepicker, RouterModule.forChild(ROUTES)],
})
export class DashboardModule {}
