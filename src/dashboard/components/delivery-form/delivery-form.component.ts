import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Delivery, InventoryType } from 'src/shared/model/delivery.model';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Ledger } from 'src/shared/model/ledger.model';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { UtilService } from 'src/service/util.service';

@Component({
  selector: 'delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.scss']
})
export class DeliveryFormComponent implements OnChanges {
  @Input() vouchar_no: number;
  @Input() ledgerList: Ledger[];
  @Input() deliveryList: Delivery[];

  @Output() create = new EventEmitter<Delivery>();

  form: FormGroup;
  errorMessage: string = '';
  mouseoverShifting = false;
  ngDate;
  ledger: Ledger;
  preDel: Delivery[];
  typeEnum = InventoryType;
  pre_delivery;

  searchLedger = (text$: Observable<any>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        const res = term.length < 2 ? []
          : this.ledgerList.filter(v => v.sr_no.indexOf(term.toLowerCase()) > -1 && v.year == this.ngDate.year).slice(0, 10)
        const names = res.map(r => r.sr_no);
        return names;
      })
    )

  constructor(private fb: FormBuilder, private util: UtilService) {
    this.pre_delivery = { quantity: 0, service_rent: 0, loan_amount: 0, loan_profit: 0, loan_payable: 0, emptyBag_quantity: 0, emptyBag_amount: 0, total: 0 }
    this.ngDate = this.util.convertJsDateToNgbDate(new Date());
    this.createForm();
    this.form.get('inventoryType').disable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vouchar_no && this.vouchar_no != null) {
      this.form.controls.vouchar_no.setValue(this.vouchar_no + 1);
    }
  }

  createForm() {
    this.form = this.fb.group({
      vouchar_no: ['', Validators.required],
      date: [this.ngDate, Validators.required],
      year: [this.ngDate.year, Validators.required],
      inventoryType: ['DELIVERY', Validators.required],
      sr_no: ['', Validators.required],
      customer: ['', Validators.required],
      quantity: ['', Validators.required],
      rate: ['', Validators.required],
      service_rent: ['', Validators.required],
      loan_amount: ['', Validators.required],
      loan_rate: ['', Validators.required],
      loan_profit: ['', Validators.required],
      loan_payable: ['', Validators.required],
      emptyBag_quantity: ['', Validators.required],
      emptyBag_rate: ['', Validators.required],
      emptyBag_amount: ['', Validators.required],
      total: ['', Validators.required],
    });
  }

  onSelectSRNo(event) {
    const evn = this.ledgerList.find(f => f.sr_no == event.item && f.year == this.ngDate.year);
    this.ledger = evn;
    this.preDel = this.deliveryList.filter(f => f.sr_no == event.item && f.year == this.ngDate.year);
    let pre_delivery = { quantity: 0, service_rent: 0, loan_amount: 0, loan_profit: 0, loan_payable: 0, emptyBag_quantity: 0, emptyBag_amount: 0, total: 0 }
    if (this.preDel) {
      this.preDel.forEach(d => {
        pre_delivery.quantity += d.quantity;
        pre_delivery.service_rent += d.service_rent;
        pre_delivery.loan_amount += d.loan_amount;
        pre_delivery.loan_payable += d.loan_payable;
        pre_delivery.emptyBag_quantity += d.emptyBag_quantity;
        pre_delivery.emptyBag_amount += d.emptyBag_amount;
        pre_delivery.total += d.total;
      })
      this.pre_delivery = pre_delivery;
    }
    const value = {
      customer: evn.customer,
      quantity: evn.quantity - pre_delivery.quantity,
      rate: evn.rate,
      service_rent: evn.service_amount - pre_delivery.service_rent,
      loan_amount: evn.loan_amount ? (evn.loan_amount - pre_delivery.loan_amount) : 0,
      loan_rate: evn.loan_rate ? evn.loan_rate : 0,
      loan_profit: evn.loan_profit ? (evn.loan_profit - pre_delivery.loan_profit) : 0,
      loan_payable: evn.loan_payable ? (evn.loan_payable - pre_delivery.loan_payable) : 0,
      emptyBag_quantity: evn.emptyBag_quantity - pre_delivery.emptyBag_quantity,
      emptyBag_rate: evn.emptyBag_rate,
      emptyBag_amount: evn.emptyBag_amount - pre_delivery.emptyBag_amount,
      total: evn.service_amount + (evn.loan_payable ? evn.loan_payable : 0) + evn.emptyBag_amount
    }
    this.form.patchValue(value);
    this.updateTotal();
  }

  onQuantityChange() {
    const fvalue = this.form.value;
    this.form.controls.service_rent.setValue(fvalue.quantity * fvalue.rate);
    this.updateTotal();
  }

  onEmptybagQuantityChange() {
    const fvalue = this.form.value;
    this.form.controls.emptyBag_amount.setValue(fvalue.emptyBag_quantity * fvalue.emptyBag_rate);
    this.updateTotal();
  }

  onLoanChange() {
    const fvalue = this.form.value;
    const loan_profit = fvalue.loan_amount * fvalue.loan_rate / 100;
    const loan_payable = loan_profit + fvalue.loan_amount;
    this.form.controls.loan_profit.setValue(loan_profit);
    this.form.controls.loan_payable.setValue(loan_payable);
    this.updateTotal();
  }

  updateTotal() {
    const fvalue = this.form.value;
    this.form.controls.total.setValue(fvalue.service_rent + fvalue.loan_payable + fvalue.emptyBag_amount);
  }

  submit() {
    if (this.form.valid) {
      this.errorMessage = '';
      this.updateTotal();
      const fvalue = this.form.value;
      if (fvalue.quantity > (this.ledger.quantity - this.pre_delivery.quantity)) {
        this.errorMessage = 'Quantity value error, should be less then or equl to ' + (this.ledger.quantity - this.pre_delivery.quantity);
      } else if (fvalue.loan_amount > (this.ledger.loan_amount - this.pre_delivery.loan_amount)) {
        this.errorMessage = 'Loan error, should be less then or equal to ' + (this.ledger.loan_amount - this.pre_delivery.loan_amount);
      } else if (fvalue.emptyBag_quantity > (this.ledger.emptyBag_quantity - this.pre_delivery.emptyBag_quantity)) {
        this.errorMessage = 'Empty bag error, should be less then or equal to ' + (this.ledger.emptyBag_quantity - this.pre_delivery.emptyBag_quantity);
      } else if (fvalue.total > 0) {
        const dateValue = this.util.convertNgbDateToJsDate(fvalue.date);
        const value = { ...fvalue, date: dateValue }
        this.create.emit(value);
        this.clear();
      }
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

  clear() {
    this.ledger = null;
    this.preDel = null;
    this.pre_delivery = { quantity: 0, service_rent: 0, loan_amount: 0, loan_profit: 0, loan_payable: 0, emptyBag_quantity: 0, emptyBag_amount: 0, total: 0 }

    this.form.reset();
    const value = {
      vouchar_no: this.vouchar_no + 1,
      date: this.ngDate,
      year: this.ngDate.year,
      inventoryType: 'DELIVERY',
    }
    this.form.patchValue(value);
  }

}
