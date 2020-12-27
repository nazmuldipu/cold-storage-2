import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Role } from 'src/shared/model/role.model';
import { User } from 'src/shared/model/user.model';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnChanges {
  @Input() user: User;
  @Input() roleList: Role[];

  @Output() create = new EventEmitter<User>();
  @Output() update = new EventEmitter<User>();
  @Output() delete = new EventEmitter<string>();

  form: FormGroup;
  errorMessage: string = '';
  exists = false;
  showPassword = false;
  mouseoverShifting = false;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user && this.user != null) {
      this.form.reset();
      const role = this.roleList.find((r) => r.name == this.user.role);
      const value = { ...this.user, role };
      this.exists = true;
      this.form.patchValue(value);
    }
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^01[3-9][ ]?[0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$'),
        ],
      ],
      password: ['', Validators.required],
      role: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const fvalue = this.form.value;
      const role = fvalue.role.name;
      const value = { ...this.form.value, role };
      if (this.exists) {
        const resp = { ...this.user, ...value };
        this.update.emit(resp);
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
    this.delete.emit(this.user._id);
    this.clear();
  }

  clear() {
    this.exists = false;
    this.user = null;
    this.errorMessage = '';
    this.form.reset();
  }
}
