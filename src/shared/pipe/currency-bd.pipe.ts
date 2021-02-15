import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyBd',
})
export class CurrencyBdPipe implements PipeTransform {
  num_to_bd = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

  transform(value: number, args?: any): string {
    // var numArray = this.numberToArray(value);
    // return this.arrayToTaka(numArray);
    if (value % 1 === 0) {
      return this.arrayToTaka(this.IntegerToArray(value));
    } else {
      let Integer = Math.floor(value - (value % 1));
      let fraction = (value % 1) * 10000;
      fraction -= fraction % 1;
      fraction = Math.round(fraction / 100);
      return (
        this.arrayToTaka(this.IntegerToArray(Integer)) +
        '.' +
        this.arrayToTaka(this.IntegerToArray(fraction))
      );
    }
  }

  arrayToTaka(arr: string[]): string {
    arr = arr.reverse();
    let res = '';
    for (let i = 0; i < arr.length; i++) {
      if (i == 3 || (i > 3 && i % 2 == 1)) {
        res = ',' + res;
      }
      res = arr[i] + res;
    }
    return res;
  }

  IntegerToArray(n: number): string[] {
    let res: string[] = [];
    let i = n;
    while (i > 0) {
      res.push((i % 10) + '');
      i = Math.floor(i / 10);
    }
    res = res.reverse();
    for (i = 0; i < res.length; i++) {
      res[i] = this.num_to_bd[res[i]];
    }
    return res;
  }
}
