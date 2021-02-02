import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyBd'
})
export class CurrencyBdPipe implements PipeTransform {
  num_to_bd = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

  transform(value: number, args?: any): unknown {
    var numArray = this.numberToArray(value);
    return this.arrayToTaka(numArray);
  }
  arrayToTaka(arr: string[]): string {
    arr = arr.reverse();
    let res = '';
    for (let i = 0; i < arr.length; i++) {
      if (i == 3 || (i > 3 && i%2 == 1)) {
        res = ',' + res;
      }
      res = arr[i] + res;
    }
    return res;
  }
  numberToArray(n: number): string[] {
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
