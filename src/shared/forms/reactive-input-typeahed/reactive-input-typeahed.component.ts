import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { LABEL_LIST } from '../constants/reactive-form-labels-list';

@Component({
  selector: 'reactive-input-typeahed',
  templateUrl: './reactive-input-typeahed.component.html',
  styleUrls: ['./reactive-input-typeahed.component.scss'],
})
export class ReactiveInputTypeahedComponent implements OnInit {
  @Input() fieldId: string | null = null;
  @Input() control: AbstractControl | null = null;
  @Input() itemList = [];
  @Input() col: boolean = false;
  @Input() searchPath: string;

  @Output() select = new EventEmitter<any>();

  label: string = null;
  validator;
  validationErrors: object = null;

  search = (text$: Observable<any>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) => {
        const res =
          term.length < 2
            ? []
            : this.itemList
                .filter(
                  (v) => v[this.searchPath].indexOf(term.toLowerCase()) > -1
                )
                .slice(0, 10);
        return res;
      })
    );

  formatter = (result: string) => {
    if (result) return result[this.searchPath];
  };

  ngOnInit() {
    this.label = LABEL_LIST[this.fieldId] ? LABEL_LIST[this.fieldId] : '';
  }

  onSelectItem(event) {
    console.log(event.item[this.searchPath])
    this.select.emit(event.item[this.searchPath]);
  }

  ngDoCheck() {
    this.validationErrors =
      this.control.touched && this.control.invalid
        ? this.control['errors']
        : null;
  }
}
