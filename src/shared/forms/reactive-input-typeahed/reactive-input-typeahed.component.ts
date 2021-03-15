import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { AgentService } from 'src/service/agent.service';
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
  @Input() searchPath: string[];
  @Input() showLabel: boolean = true;

  @Output() select = new EventEmitter<any>();

  label: string = null;
  validator;
  validationErrors: object = null;
  constructor(private agentService: AgentService) {}

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => {
        if (term.length < 3) return [];
        return this.agentService.getAgentList(1, 10, 'phone', 'asc', term).pipe(
          catchError(() => {
            return of([]);
          })
        );
      }),
      map((p) => (p ? p['docs'] : []))
    );

  formatter = (result: string) => {
    if (result)
      return (
        result[this.searchPath[1]] + '-[' + result[this.searchPath[0]] + ']'
      );
  };

  ngOnInit() {
    this.label = LABEL_LIST[this.fieldId] ? LABEL_LIST[this.fieldId] : '';
  }

  onSelectItem(event) {
    this.select.emit(event.item);
  }

  ngDoCheck() {
    this.validationErrors =
      this.control.touched && this.control.invalid
        ? this.control['errors']
        : null;
  }
}
