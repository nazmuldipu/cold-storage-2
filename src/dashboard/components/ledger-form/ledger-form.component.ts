import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { BaseFormComponent } from 'src/shared/forms/base-form/base-form.component';

import { InventoryService } from './../../../service/inventory.service';
import { Inventory } from './../../../shared/model/inventory.model';
import _ from 'lodash';

@Component({
  selector: 'ledger-form',
  templateUrl: './ledger-form.component.html',
  styleUrls: ['./ledger-form.component.scss'],
})
export class LedgerFormComponent extends BaseFormComponent {
  year;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService
  ) {
    super();
    this.year = new Date().getFullYear();
    this.createForm();
  }

  searchInventory = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => {
        if (term.length < 3) return [];
        return this.inventoryService
          .getInventoryList(1, 10, 'phone', 'asc', term)
          .pipe(
            catchError(() => {
              return of([]);
            })
          );
      }),
      map((p) => (p ? p['docs'] : []))
    );

  formatter = (result: Inventory) => {
    if (result) return result.sr_no;
  };

  createForm() {
    this.form = this.fb.group({
      sr_no: ['', Validators.required],
      year: [this.year, Validators.required],
      customer: ['', Validators.required],
      agent: [''],
      loan_amount: [0],
      loan_rate: [0],
      loan_profit: [''],
      loan_payable: [''],
      quantity: [0, Validators.required],
      rate: [0, Validators.required],
      service_amount: [0],
      emptyBag_quantity: [0],
      emptyBag_rate: [0],
      emptyBag_amount: [0],
      total_amount: [0, Validators.required],
    });
  }

  onSelectSRNo({ item }) {
    const value = {
      sr_no: item.sr_no,
      year: item.year,
      customer: item.customer,
      agent: item.agent,
      quantity: item.quantity,
    };
    _.unset(value, 'customer._id');
    _.unset(value, 'agent._id');
    _.unset(value, 'agent.slug');
    this.form.patchValue(value);
  }

  onLoanChange() {
    const value = this.form.value;
    const loan_profit = (+value.loan_amount * +value.loan_rate) / 100;
    const loan_payable = loan_profit + +value.loan_amount;
    this.form.patchValue({loan_profit, loan_payable});
    this.calculateTotal();
  }

  onQuantityChange() {
    const value = this.form.value;
    this.form.controls.service_amount.setValue(+value.rate * +value.quantity);
    this.calculateTotal();
  }

  onEmptybagChange() {
    const value = this.form.value;
    this.form.controls.emptyBag_amount.setValue(+value.emptyBag_quantity * +value.emptyBag_rate);
    this.calculateTotal();
  }

  calculateTotal() {
    const value = this.form.value;
    const loan = value.loan_amount ? value.loan_payable : 0;
    this.form.controls.total_amount.setValue(
      value.service_amount + value.emptyBag_amount + loan
    );
  }
}
