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
import { LoadingComponent } from './containers/loading/loading.component';
import { LoadingAddComponent } from './containers/loading-add/loading-add.component';
import { LoadingFormComponent } from './components/loading-form/loading-form.component';

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
      { path: 'loading', component: LoadingComponent },
      { path: 'add-loading', component: LoadingAddComponent },
      { path: 'add-loading/:id', component: LoadingAddComponent },
      { path: 'user', component: UserComponent },
      { path: 'role', component: RoleComponent },
      { path: 'company', component: CompanyComponent },
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
    LoadingComponent,
    LoadingAddComponent,
    LoadingFormComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(ROUTES)],
})
export class DashboardModule {}
