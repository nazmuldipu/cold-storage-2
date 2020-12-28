import { EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Component, OnChanges, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Company } from 'src/shared/model/company.model';

@Component({
  selector: 'company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent implements OnChanges {
  @Input() company: Company;

  @Output() create = new EventEmitter<Company>();
  @Output() update = new EventEmitter<Company>();
  @Output() delete = new EventEmitter<string>();

  form: FormGroup;
  errorMessage: string = '';
  exists = false;
  mouseoverShifting = false;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.company && this.company != null) {
      this.form.reset();
      this.exists = true;
      this.form.patchValue(this.company);
    }
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^01[3-9][ ]?[0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$'),
        ],
      ],
      address: ['', Validators.required],
      vat_no: [''],
      trade_licence: ['', Validators.required],
      tin_no: [''],
      website: [''],
      vat: [''],
    });
  }

  submit() {
    if (this.form.valid) {
      if (this.exists) {
        this.update.emit(this.form.value);
      } else {
        this.create.emit(this.form.value);
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
    this.delete.emit(this.company._id);
    this.clear();
  }

  clear() {
    this.exists = false;
    this.company = null;
    this.errorMessage = '';
    this.form.reset();
  }
}
