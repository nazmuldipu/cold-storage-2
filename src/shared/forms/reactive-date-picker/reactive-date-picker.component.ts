import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { LABEL_LIST } from '../constants/reactive-form-labels-list';

@Component({
  selector: 'reactive-date-picker',
  templateUrl: './reactive-date-picker.component.html',
  styleUrls: ['./reactive-date-picker.component.scss']
})
export class ReactiveDatePickerComponent implements OnInit, DoCheck {
  @Input() fieldId: string | null = null;
  @Input() control: AbstractControl | null = null;
  @Input() readonly: boolean = false;
  @Input() col: boolean = false;

  label: string = null;
  validator;
  validationErrors: object = null;

  ngOnInit() {
    this.label = LABEL_LIST[this.fieldId] ? LABEL_LIST[this.fieldId] : '';
  }

  ngDoCheck() {
    this.validator = this.control.validator({} as AbstractControl);
    
    this.validationErrors =
      this.control.touched && this.control.invalid
        ? this.control['errors']
        : null;
  }
}
