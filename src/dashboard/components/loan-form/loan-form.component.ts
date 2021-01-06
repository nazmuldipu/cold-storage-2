import { Component, OnInit, OnChanges, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Loan } from 'src/shared/model/loan.model';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { UtilService } from 'src/service/util.service';
import { InventoryService } from 'src/service/inventory.service';
import { Inventory } from 'src/shared/model/inventory.model';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss']
})
export class LoanFormComponent implements OnChanges {
  @Input() loan: Loan;

  @Output() create = new EventEmitter<Loan>();
  @Output() update = new EventEmitter<Loan>();
  @Output() delete = new EventEmitter<string>();

  ngDate;
  form: FormGroup;
  errorMessage: string = '';
  exists = false;
  mouseoverShifting = false;
  inventoryList: Inventory[];
  searchInventory = (text$: Observable<any>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        const res = term.length < 2 ? []
          : this.inventoryList.filter(v => v.sr_no.indexOf(term.toLowerCase()) > -1).slice(0, 10)
        const names = res.map(r => r.sr_no);
        return names;
      })
    )

  constructor(private fb: FormBuilder, private util: UtilService, private inventoryService: InventoryService) {
    this.ngDate = this.util.convertJsDateToNgbDate(new Date());
    this.createForm();
    this.getInventoryList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loan && this.loan != null) {
      this.form.reset();
      this.exists = true;
      this.form.patchValue(this.loan);
    }
  }

  async getInventoryList() {
    this.inventoryService.inventorys$.subscribe(data => {
      this.inventoryList = data.filter(f => f.year = this.ngDate.year);
    })
  }

  createForm() {
    this.form = this.fb.group({
      date: [this.ngDate, Validators.required],
      year: [this.ngDate.year, Validators.required],
      sr_no: ['', Validators.required],
      amount: [0, Validators.required],
      rate: [0, Validators.required],
      payable: [0, Validators.required],
      profit: [0, Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const fvalue = this.form.value;
      const dateValue = this.util.convertNgbDateToJsDate(fvalue.date);
      const value = { ...fvalue, date: dateValue }

      if (this.exists) {
        this.update.emit(value);
      } else {
        this.create.emit(value);
      }
      this.clear();
    }
  }

  getFormValidationErrors() {
    let errors = '';
    Object.keys(this.form.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          errors += key + ' : ' + keyError + '; ';
        });
      }
    });
    return errors;
  }

  calculateLoan() {
    const fvalue = this.form.value;
    const profit = fvalue.rate * fvalue.amount / 100;
    const payable = fvalue.amount + profit;
    this.form.controls.profit.setValue(profit);
    this.form.controls.payable.setValue(payable);
  }

  onDelete() {
    this.delete.emit(this.loan._id);
    this.clear();
  }

  clear() {
    this.exists = false;
    this.loan = null;
    this.errorMessage = '';
    this.form.reset();
    this.form.controls.date.setValue(this.ngDate);
  }
}
