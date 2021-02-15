import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { LABEL_LIST } from '../constants/reactive-form-labels-list';

@Component({
  selector: 'reactive-input',
  templateUrl: './reactive-input.component.html',
  styleUrls: ['./reactive-input.component.scss'],
})
export class ReactiveInputComponent implements OnInit, DoCheck {
  @Input() fieldId: string | null = null;
  @Input() control: AbstractControl | null = null;
  @Input() type: string = 'text';
  @Input() maxlength: number = null;
  @Input() readonly: boolean = false;
  @Input() col: boolean = false;
  @Input() showLabel:boolean = true;

  @Output() onChange = new EventEmitter<any>();

  label: string = null;
  validator;
  validationErrors: object = null;

  ngOnInit() {
    this.label = LABEL_LIST[this.fieldId] ? LABEL_LIST[this.fieldId] : '';
  }

  ngDoCheck() {
    if (this.control['validator'])
      this.validator = this.control.validator({} as AbstractControl);

    this.validationErrors =
      this.control.touched && this.control.invalid
        ? this.control['errors']
        : null;
  }

  onValueChange(event) {
    this.onChange.emit(event);
  }
}
