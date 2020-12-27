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

export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'chamber', component: ChamberComponent },
      { path: 'floor', component: FloorComponent },
      // { path: 'line', component: LineComponent },
      // { path: 'pocket', component: PocketComponent },
      // { path: 'position', component: PositionComponent },
      // { path: 'chamber-type', component: ChamberTypeComponent },
      // { path: 'agent', component: AgentComponent },
      // { path: 'customer', component: CustomerComponent },
      // { path: 'loading', component: LoadingComponent },
      // { path: 'add-loading', component: LoadingAddComponent },
      // { path: 'add-loading/:id', component: LoadingAddComponent },
      // { path: 'user', component: UserComponent },
      // { path: 'role', component: RoleComponent },
      // { path: 'company', component: CompanyComponent },
      { path: '', component: IndexComponent },
    ],
  },
];

@NgModule({
  declarations: [DashboardComponent, IndexComponent, DashNavComponent, ChamberComponent, ChamberFormComponent, FloorComponent, FloorFormComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
  ]
})
export class DashboardModule { }
