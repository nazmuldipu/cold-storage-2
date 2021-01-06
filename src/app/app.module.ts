import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceModule } from 'src/service/service.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AuthGuard } from 'src/service/auth-guard.service';
import { TestComponent } from './test/test.component';
import { NumberToWordsPipe } from 'src/shared/pipe/number-to-words.pipe';

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
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
