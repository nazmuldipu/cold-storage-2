import { Component, Input, OnInit } from '@angular/core';
import { CurrencyBdPipe } from 'src/shared/pipe/currency-bd.pipe';
import { NumberToBanglaPipe } from 'src/shared/pipe/number-to-bangla.pipe';

@Component({
  selector: '[NgTableFooter]',
  templateUrl: './ng-table-foot.component.html',
  styleUrls: ['./ng-table-foot.component.scss'],
})
export class NgTableFootComponent implements OnInit {
  @Input() columns;
  @Input() total;
  
  constructor() {}

  ngOnInit(): void {}

  getTotal(path) {
    const value = this.total.find((f) => f.path == path);

    if (value && value.total) {
      if (value.pipe === 'numberToBangla')
        return new NumberToBanglaPipe().transform(value.total);
      else if (value.pipe === 'currencyBd')
        return new CurrencyBdPipe().transform(value.total);
      return value.total;
    } else if (value && value.label) {
      return value.label;
    }

    return null;
  }
}
