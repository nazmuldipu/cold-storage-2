import { Component, OnInit, Input } from '@angular/core';
import { NumberToBanglaPipe } from 'src/shared/pipe/number-to-bangla.pipe';
import { CurrencyBdPipe } from 'src/shared/pipe/currency-bd.pipe';

@Component({
  selector: '[TableFooter]',
  templateUrl: './table-footer.component.html',
  styleUrls: ['./table-footer.component.scss'],
})
export class TableFooterComponent {
  @Input() columns;
  @Input() total;

  constructor() {}

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
