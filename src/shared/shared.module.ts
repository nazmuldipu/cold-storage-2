import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NumberToWordsPipe } from './pipe/number-to-words.pipe';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgbModule
  ],
  exports: [
    CommonModule, LoadingComponent, NgbModule, FormsModule, ReactiveFormsModule
  ]
})
export class SharedModule { }
