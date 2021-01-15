import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToBangla'
})
export class NumberToBanglaPipe implements PipeTransform {
  num_to_bd = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']

  transform(value: number, args?: any): string {
    let v = (value + '').split(".");
    if (v.length == 1) {
      return this.engToBd(value);
    } else if (v.length == 2) {
      return this.engToBd(parseInt(v[0])) + '.' + this.engToBd(parseInt(v[1]));
    }
    return '';
  }

  engToBd(n: number): string {
    let res = '';
    if (n < 0) {
      res = '-';
      n = -n;
    }

    if (n > 9) {
      let b = n % 10;
      return res + this.engToBd(Math.floor(n / 10)) + this.num_to_bd[b];
    }
    return res + this.num_to_bd[n];
  }




}
