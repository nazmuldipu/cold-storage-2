import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/shared/shared.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule
  ]
})
export class DashboardModule { }
