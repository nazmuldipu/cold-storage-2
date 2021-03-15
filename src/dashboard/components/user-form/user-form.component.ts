import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { BaseFormComponent } from 'src/shared/forms/base-form/base-form.component';
import { Role } from 'src/shared/model/role.model';
import { User } from 'src/shared/model/user.model';
import { PHONE_NUMBER_PATTERN } from 'src/shared/forms/constants/validation-patterns-list';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent extends BaseFormComponent {
  @Input() roleList: Role[];

  showPassword = false;

  constructor(private fb: FormBuilder) {
    super();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(PHONE_NUMBER_PATTERN)],
      ],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }
  
  clear() {
    this.exists = false;
    this.item = null;
    this.errorMessage = '';
    this.form.reset();
  }
}
