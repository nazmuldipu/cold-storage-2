import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UtilService } from 'src/service/util.service';
import { Inventory, InventoryType } from 'src/shared/model/inventory.model';

@Component({
  selector: 'inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss'],
})
export class InventoryFormComponent implements OnChanges {
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

  constructor(private fb: FormBuilder, private util: UtilService) {
    this.ngDate = this.util.convertJsDateToNgbDate(new Date());
    this.createForm();
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
  }

  createForm() {
    this.form = this.fb.group({
      inventoryType: ['RECEIVE', Validators.required],
      date: [this.ngDate, Validators.required],
      sr_no: ['', Validators.required],
      name: ['', Validators.required],
      sub_name: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^01[3-9][ ]?[0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$'),
        ],
      ],
      quantity: ['', Validators.required],
      unit: ['', Validators.required],
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
  }
}
