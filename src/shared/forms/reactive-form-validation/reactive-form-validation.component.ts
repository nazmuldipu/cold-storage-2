import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

import { LABEL_LIST } from '../constants/reactive-form-labels-list';
import {
  PATTERN_MESSAGE,
  REQUIRED_MESSAGE,
} from '../constants/validation-messages-list';

@Component({
  selector: 'reactive-form-validation',
  templateUrl: './reactive-form-validation.component.html',
  styleUrls: ['./reactive-form-validation.component.scss'],
})
export class ReactiveFormValidationComponent implements OnChanges {
  @Input() form: FormGroup | null = null;

  errorMessage: string | null = null;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.errorMessage = this.getFormValidationErrors();
  }

  getFormValidationErrors() {
    let errors = '';
    Object.keys(this.form.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          errors +=
            LABEL_LIST[key] +
            (keyError == 'required'
              ? REQUIRED_MESSAGE
              : keyError == 'pattern'
              ? PATTERN_MESSAGE
              : keyError == 'maxlength'
              ? 'Max Length error'
              : 'Unknown') +
            '; ';
        });
      }
    });
    return errors;
  }
}
