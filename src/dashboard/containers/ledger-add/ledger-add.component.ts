import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/shared/model/inventory.model';
import { UtilService } from 'src/service/util.service';
import { InventoryService } from 'src/service/inventory.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil, take } from 'rxjs/operators';
import { LedgerService } from 'src/service/ledger.service';
import { Ledger } from 'src/shared/model/ledger.model';

@Component({
  selector: 'app-ledger-add',
  templateUrl: './ledger-add.component.html',
  styleUrls: ['./ledger-add.component.scss']
})
export class LedgerAddComponent implements OnInit {
  id;
  year;
  exists = false;
  form: FormGroup;
  mouseoverShifting = false;
  ledgerList: Ledger[] = [];

  errorMessage = '';

  // loanList: Loan[] = [];
  inventoryList: Inventory[] = [];
  searchInventory = (text$: Observable<any>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        const res = term.length < 2 ? []
          : this.inventoryList.filter(v => v.sr_no.indexOf(term.toLowerCase()) > -1 && v.year == this.year).slice(0, 10)
        const names = res.map(r => r.sr_no);
        return names;
      })
    )

  constructor(private fb: FormBuilder, private inventoryService: InventoryService,
    private ledgerService: LedgerService, private util: UtilService) {
    let dd = new Date();
    this.year = dd.getFullYear();
    this.getAllLedger();
    this.createForm();
  }

  async getAllLedger() {
    this.ledgerService.ledgers$.subscribe(data => {
      this.ledgerList = data;
    })
  }

  ngOnInit(): void {
    this.getInventoryList(this.year)
  }

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
      note: [''],
      quantity: [0, Validators.required],
      rate: [0, Validators.required],
      service_amount: [0,],
      emptyBag_quantity: [0,],
      emptyBag_rate: [0,],
      emptyBag_amount: [0,],
      labour_charge: [0,],
      transport_amount: [0,],
      others_amount: [0,],
      advance_amount: [0,],
      total_amount: [0, Validators.required],
    });
  }

  async getInventoryList(year) {
    this.inventoryService.inventorys$.subscribe(data => {
      this.inventoryList = data.filter(d => d.year == year);
    })
  }

  async onSelectSRNo(event) {
    await this.ledgerService.ledgers$.pipe(take(1)).subscribe(data => {
      const resp = data.find(d => d.sr_no == event.item);
      if (resp) {
        this.id = resp._id;
        this.exists = true;
        this.form.patchValue(resp);
      } else {
        this.exists = false;
        const inv = this.inventoryList.find(inv => inv.sr_no == event.item);
        this.form.controls.customer.setValue(inv.customer);
        if (inv.agent) {
          this.form.controls.agent.setValue(inv.agent);
        }
        this.form.controls.agent.setValue(inv.agent);
        this.form.controls.quantity.setValue(inv.quantity);

        // this.loanService.loans$.subscribe(data => {
        //   const value = data.find(f => f.sr_no == event.item);
        //   this.form.controls.loan.setValue(value);
        //   this.calculateTotal();
        // })
      }
    })

  }

  onQuantityChange() {
    const value = this.form.value;
    this.form.controls.service_amount.setValue(value.rate * value.quantity);
    this.calculateTotal();
  }

  onEmptybagChange() {
    const value = this.form.value;
    this.form.controls.emptyBag_amount.setValue(value.emptyBag_quantity * value.emptyBag_rate);
    this.calculateTotal();
  }

  onLoanChange() {
    const value = this.form.value;
    const loan_profit = value.loan_amount * value.loan_rate / 100;
    const loan_payable = loan_profit + value.loan_amount;
    this.form.controls.loan_profit.setValue(loan_profit);
    this.form.controls.loan_payable.setValue(loan_payable);
    this.calculateTotal();
  }

  calculateTotal() {
    const value = this.form.value;
    const loan = value.loan ? value.loan.payable : 0;
    this.form.controls.total_amount.setValue(value.service_amount + value.emptyBag_amount + loan);
  }

  async submit() {
    if (this.form.valid) {
      const fvalue = this.form.value;
      Object.keys(fvalue).forEach(key => fvalue[key] === undefined ? delete fvalue[key] : {});
      if (!this.exists) {
        await this.ledgerService.create(fvalue).then(ref => {
          this.clear();
        }).catch(error => console.log('error', error))
      } else {
        await this.ledgerService.update(this.id, fvalue).then(ref => {
          this.clear();
        }).catch(error => console.log('error', error))
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
    this.id = null;
    this.form.reset();
    this.form.controls.year.setValue(this.year);
    this.exists = false;
  }
}
