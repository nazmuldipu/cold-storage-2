import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import _ from 'lodash';
import { DatePipe } from '@angular/common';
import { NumberToBanglaPipe } from '../../pipe/number-to-bangla.pipe';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { CurrencyBdPipe } from 'src/shared/pipe/currency-bd.pipe';

@Component({
  selector: '[TableBody]',
  templateUrl: './table-body.component.html',
  styleUrls: ['./table-body.component.scss'],
})
export class TableBodyComponent implements OnInit {
  @Input() columns;
  @Input() data;

  @Output() btnEvent = new EventEmitter<any>();

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

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

  public sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  handleClick(event){
    this.btnEvent.emit(event);
  }
}
