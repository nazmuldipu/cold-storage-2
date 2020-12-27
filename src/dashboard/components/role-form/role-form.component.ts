import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Role } from 'src/shared/model/role.model';

@Component({
  selector: 'role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
})
export class RoleFormComponent implements OnChanges {
  @Input() role: Role;

  @Output() create = new EventEmitter<Role>();
  @Output() update = new EventEmitter<Role>();
  @Output() delete = new EventEmitter<string>();

  form: FormGroup;
  errorMessage: string = '';
  exists = false;
  mouseoverShifting = false;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.role && this.role != null) {
      this.form.reset();
      this.exists = true;
      this.form.patchValue(this.role);
    }
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      if (this.exists) {
        const value = { ...this.role, ...this.form.value };
        this.update.emit(value);
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
    this.delete.emit(this.role._id);
    this.clear();
  }

  clear() {
    this.exists = false;
    this.role = null;
    this.errorMessage = '';
    this.form.reset();
  }
}
