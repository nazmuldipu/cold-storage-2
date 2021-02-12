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
    TableComponent,
  ],
})
export class SharedModule {}
