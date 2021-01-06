import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NumberToWordsPipe } from './pipe/number-to-words.pipe';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgbModule
  ],
  exports: [
    CommonModule, NgbModule, FormsModule, ReactiveFormsModule
  ]
})
export class SharedModule { }
