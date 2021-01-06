import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UtilService } from 'src/service/util.service';
import { Inventory, InventoryType } from 'src/shared/model/inventory.model';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Agent } from 'src/shared/model/agent.model';
import { CustomerService } from 'src/service/customer.service';
import { AgentService } from 'src/service/agent.service';

@Component({
  selector: 'inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss'],
})
export class InventoryFormComponent implements OnChanges {
  @Input() vouchar_no: number;
  @Input() inventory: Inventory;

  @Output() create = new EventEmitter<Inventory>();
  @Output() update = new EventEmitter<Inventory>();
  @Output() delete = new EventEmitter<string>();

  typeEnum = InventoryType;
  form: FormGroup;
  errorMessage: string = '';
  exists = false;
  mouseoverShifting = false;
  ngDate;

  agentList: Agent[] = [];
  searchAgent = (text$: Observable<any>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        const res = term.length < 2 ? []
          : this.agentList.filter(v => v.phone.indexOf(term.toLowerCase()) > -1).slice(0, 10)
        return res;
      })
    )

  customerList: Agent[] = [];
  searchCustomer = (text$: Observable<any>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        const res = term.length < 2 ? []
          : this.customerList.filter(v => v.phone.indexOf(term.toLowerCase()) > -1).slice(0, 10)
        return res;
      })
    )

  formatter = (result: string) => { if (result) return result['name'] + '[' + result['phone'] + ']' };

  constructor(private fb: FormBuilder, private customerService: CustomerService,
    private agentService: AgentService, private util: UtilService) {
    this.ngDate = this.util.convertJsDateToNgbDate(new Date());
    this.createForm();
    this.getCustomerList();
    this.getAgentList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.inventory && this.inventory != null) {
      this.form.reset();
      const date = this.util.convertFireabaseDateToNgbDate(this.inventory.date);
      console.log(date, date);
      const value = { ...this.inventory, date }
      this.exists = true;
      this.form.patchValue(value);
    }
    if (changes.vouchar_no && this.vouchar_no != null) {
      this.form.controls.vouchar_no.setValue(this.vouchar_no + 1);
    }
  }

  async getCustomerList() {
    this.customerService.customers$.subscribe((data) => {
      this.customerList = data;
      this.customerList.sort(this.util.dynamicSortObject('priority'));
    });
  }

  async getAgentList() {
    this.agentService.agents$.subscribe((data) => {
      this.agentList = data;
      this.agentList.sort(this.util.dynamicSortObject('priority'));
    });
  }

  createForm() {
    this.form = this.fb.group({
      inventoryType: ['RECEIVE', Validators.required],
      vouchar_no: [0, Validators.required],
      date: [this.ngDate, Validators.required],
      year: [this.ngDate.year, Validators.required],
      sr_no: ['', Validators.required],
      name: ['Potato', Validators.required],
      customer: ['', Validators.required,],
      agent: [''],
      quantity: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const fvalue = this.form.value;
      const dateValue = this.util.convertNgbDateToJsDate(fvalue.date);
      console.log(dateValue);
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

  onDelete() {
    this.delete.emit(this.inventory._id);
    this.clear();
  }

  clear() {
    this.exists = false;
    this.inventory = null;
    this.errorMessage = '';
    this.form.reset();
    const value = {
      inventoryType: 'RECEIVE',
      name: 'Potato',
      vouchar_no: this.vouchar_no + 1,
      date: this.ngDate,
      year: this.ngDate.year,
    }
    this.form.patchValue(value);
  }
}
