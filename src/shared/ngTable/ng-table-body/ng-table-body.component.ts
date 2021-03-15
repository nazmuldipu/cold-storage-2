import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import _ from 'lodash';
import { CurrencyBdPipe } from 'src/shared/pipe/currency-bd.pipe';
import { NumberToBanglaPipe } from 'src/shared/pipe/number-to-bangla.pipe';

@Component({
  selector: '[NgTableBody]',
  templateUrl: './ng-table-body.component.html',
  styleUrls: ['./ng-table-body.component.scss'],
})
export class NgTableBodyComponent{
  @Input() columns;
  @Input() data;

  @Output() btnEvent = new EventEmitter<any>();

  renderCell(item, column, i) {
    if (column.path === '#') {
      return i + 1;
    }
    if (column.content) {
      return column.content(item);
    }

    if (column.pipe) {
      switch (column.pipe) {
        case 'date':
          const value = _.get(item, column.path).toMillis();
          return new DatePipe('en-US').transform(value, column.pipeArgs);
          break;
        case 'numberToBangla':
          return new NumberToBanglaPipe().transform(_.get(item, column.path));
          break;
        case 'currencyBd':
          return new CurrencyBdPipe().transform(_.get(item, column.path));
          break;
      }
    }
    return _.get(item, column.path);
  }

  handleClick(event) {
    this.btnEvent.emit(event);
  }
}
