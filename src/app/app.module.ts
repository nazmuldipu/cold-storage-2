import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Daterangepicker } from 'ng2-daterangepicker';
import { environment } from 'src/environments/environment';
import { ServiceModule } from 'src/service/service.module';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';

export const ROUTES: Routes = [
  { path: 'test', component: TestComponent },
  // {
  //   path: 'dashboard',
  //   loadChildren: () =>
  //     import('../dashboard/dashboard.module').then((m) => m.DashboardModule), canActivate: [AuthGuard]
  // },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: '',
    loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
  },
];

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,

  ],
  imports: [
    BrowserModule,
    NgbModule,
    ServiceModule,
    Daterangepicker,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
