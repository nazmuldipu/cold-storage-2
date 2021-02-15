import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { InventoryTableComponent } from './components/inventory-table/inventory-table.component';
import { LedgerListComponent } from './components/ledger-list/ledger-list.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NumberToBanglaPipe } from 'src/shared/pipe/number-to-bangla.pipe';
import { NumberToWordBdPipe } from 'src/shared/pipe/number-to-word-bd.pipe';
import { NumberToWordsPipe } from 'src/shared/pipe/number-to-words.pipe';
import { CurrencyBdPipe } from './pipe/currency-bd.pipe';
import { RouterModule } from '@angular/router';
import { TableComponent } from './table/table/table.component';
import { TableHeaderComponent } from './table/table-header/table-header.component';
import { TableBodyComponent } from './table/table-body/table-body.component';
import { TableFooterComponent } from './table/table-footer/table-footer.component';
import { RenderInputComponent } from './forms/render-input/render-input.component';
import { ReactiveValidationComponent } from './forms/reactive-validation/reactive-validation.component';
import { ReactiveInputComponent } from './forms/reactive-input/reactive-input.component';
import { ReactiveFormValidationComponent } from './forms/reactive-form-validation/reactive-form-validation.component';
import { ReactiveSelectComponent } from './forms/reactive-select/reactive-select.component';
import { ReactiveTextareaComponent } from './forms/reactive-textarea/reactive-textarea.component';
import { BaseFormComponent } from './forms/base-form/base-form.component';
import { ReactiveDatePickerComponent } from './forms/reactive-date-picker/reactive-date-picker.component';
import { ReactiveInputTypeahedComponent } from './forms/reactive-input-typeahed/reactive-input-typeahed.component';
import { ReactiveInputColComponent } from './forms/reactive-input-col/reactive-input-col.component';

@NgModule({
  declarations: [
    InventoryTableComponent,
    LoadingComponent,
    LedgerListComponent,
    NumberToBanglaPipe,
    NumberToWordBdPipe,
    NumberToWordsPipe,
    CurrencyBdPipe,
    TableComponent,
    TableHeaderComponent,
    TableBodyComponent,
    TableFooterComponent,
    RenderInputComponent,
    ReactiveValidationComponent,
    ReactiveInputComponent,
    ReactiveFormValidationComponent,
    ReactiveSelectComponent,
    ReactiveTextareaComponent,
    BaseFormComponent,
    ReactiveDatePickerComponent,
    ReactiveInputTypeahedComponent,
    ReactiveInputColComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  exports: [
    CommonModule,
    CurrencyBdPipe,
    FormsModule,
    InventoryTableComponent,
    LedgerListComponent,
    LoadingComponent,
    NgbModule,
    NumberToBanglaPipe,
    NumberToWordBdPipe,
    NumberToWordsPipe,
    ReactiveFormsModule,
    RenderInputComponent,
    ReactiveInputComponent,
    TableComponent,
    ReactiveFormValidationComponent,
    ReactiveSelectComponent,
    ReactiveTextareaComponent,
    BaseFormComponent,
    ReactiveDatePickerComponent,
    ReactiveInputTypeahedComponent,
    ReactiveInputColComponent,
  ],
})
export class SharedModule {}
