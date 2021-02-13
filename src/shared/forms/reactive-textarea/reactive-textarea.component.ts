import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { LABEL_LIST } from '../constants/reactive-form-labels-list';

@Component({
  selector: 'reactive-textarea',
  templateUrl: './reactive-textarea.component.html',
  styleUrls: ['./reactive-textarea.component.scss'],
})
export class ReactiveTextareaComponent implements OnInit, DoCheck {
  @Input() fieldId: string | null = null;
  @Input() control: AbstractControl | null = null;
  @Input() row:number = 3;
  
  label: string = null;
  validationErrors: object = null;

  ngOnInit() {
    this.label = LABEL_LIST[this.fieldId] ? LABEL_LIST[this.fieldId] : '';
  }

  ngDoCheck() {
    this.validationErrors =
      this.control.touched && this.control.invalid
        ? this.control['errors']
        : null;
  }
}
