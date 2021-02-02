import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  num_to_bd_word = {
    '0': { value: '' },
    '1': { value: 'এক' },
    '2': { value: 'দুই' },
    '3': { value: 'তিন' },
    '4': { value: 'চার' },
    '5': { value: 'পাঁচ' },
    '6': { value: 'ছয়' },
    '7': { value: 'সাত' },
    '8': { value: 'আট' },
    '9': { value: 'নয়' },
    '10': { value: 'দশ' },
    '11': { value: 'এগার' },
    '12': { value: 'বার' },
    '13': { value: 'তের' },
    '14': { value: 'চৌদ্দ' },
    '15': { value: 'পনের' },
    '16': { value: 'ষোল' },
    '17': { value: 'সতের' },
    '18': { value: 'আঠার' },
    '19': { value: 'ঊনিশ' },
    '20': { value: 'বিশ' },
    '21': { value: 'একুশ' },
    '22': { value: 'বাইশ' },
    '23': { value: 'তেইশ' },
    '24': { value: 'চব্বিশ' },
    '25': { value: 'পঁচিশ' },
    '26': { value: 'ছাব্বিশ' },
    '27': { value: 'সাতাশ' },
    '28': { value: 'আঠাশ' },
    '29': { value: 'ঊনত্রিশ' },
    '30': { value: 'ত্রিশ' },
    '31': { value: 'একত্রিশ' },
    '32': { value: 'বত্রিশ' },
    '33': { value: 'তেত্রিশ' },
    '34': { value: 'চৌত্রিশ' },
    '35': { value: 'পঁয়ত্রিশ' },
    '36': { value: 'ছত্রিশ' },
    '37': { value: 'সাঁইত্রিশ' },
    '38': { value: 'আটত্রিশ' },
    '39': { value: 'ঊনচল্লিশ' },
    '40': { value: 'চল্লিশ' },
    '41': { value: 'একচল্লিশ' },
    '42': { value: 'বিয়াল্লিশ' },
    '43': { value: 'তেতাল্লিশ' },
    '44': { value: 'চুয়াল্লিশ' },
    '45': { value: 'পঁয়তাল্লিশ' },
    '46': { value: 'ছেচল্লিশ' },
    '47': { value: 'সাতচল্লিশ' },
    '48': { value: 'আটচল্লিশ' },
    '49': { value: 'ঊনপঞ্চাশ' },
    '50': { value: 'পঞ্চাশ' },
    '51': { value: 'একান্ন' },
    '52': { value: 'বায়ান্ন' },
    '53': { value: 'তিপ্পান্ন' },
    '54': { value: 'চুয়ান্ন' },
    '55': { value: 'পঞ্চান্ন' },
    '56': { value: 'ছাপ্পান্ন' },
    '57': { value: 'সাতান্ন' },
    '58': { value: 'আটান্ন' },
    '59': { value: 'ঊনষাট' },
    '60': { value: 'ষাট' },
    '61': { value: 'একষট্টি' },
    '62': { value: 'বাষট্টি' },
    '63': { value: 'তেষট্টি' },
    '64': { value: 'চৌষট্টি' },
    '65': { value: 'পঁয়ষট্টি' },
    '66': { value: 'ছেষট্টি' },
    '67': { value: 'সাতষট্টি' },
    '68': { value: 'আটষট্টি' },
    '69': { value: 'ঊনসত্তর' },
    '70': { value: 'সত্তর' },
    '71': { value: 'একাত্তর' },
    '72': { value: 'বাহাত্তর' },
    '73': { value: 'তিয়াত্তর' },
    '74': { value: 'চুয়াত্তর' },
    '75': { value: 'পঁচাত্তর' },
    '76': { value: 'ছিয়াত্তর' },
    '77': { value: 'সাতাত্তর' },
    '78': { value: 'আটাত্তর' },
    '79': { value: 'ঊনআশি' },
    '80': { value: 'আশি' },
    '81': { value: 'একাশি' },
    '82': { value: 'বিরাশি' },
    '83': { value: 'তিরাশি' },
    '84': { value: 'চুরাশি' },
    '85': { value: 'পঁচাশি' },
    '86': { value: 'ছিয়াশি' },
    '87': { value: 'সাতাশি' },
    '88': { value: 'আটাশি' },
    '89': { value: 'ঊননব্বই' },
    '90': { value: 'নব্বই' },
    '91': { value: 'একানব্বই' },
    '92': { value: 'বিরানব্বই' },
    '93': { value: 'তিরানব্বই' },
    '94': { value: 'চুরানব্বই' },
    '95': { value: 'পঁচানব্বই' },
    '96': { value: 'ছিয়ানব্বই' },
    '97': { value: 'সাতানব্বই' },
    '98': { value: 'আটানব্বই' },
    '99': { value: 'নিরানব্বই' },
  };

  num_to_bd = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

  hundred = ' শত ';
  thousand = ' হাজার ';
  lakh = ' লক্ষ ';
  crore = ' কোটি ';

  constructor() {}

  ngOnInit(): void {
    // for (let i = -20; i < 20; i++) {
    //   // console.log(this.engToBnWord(i) + ', ');
    //   console.log(this.engToBd(i) + ', ');
    // }
    var numArray = this.numberToArray(123456789);
    console.log(numArray);
    console.log(this.arrayToTaka(numArray));
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

  engToBdF(n: number): string {
    let v = (n + '').split('.');
    if (v.length == 1) {
      return this.engToBd(n);
    } else if (v.length == 2) {
      return this.engToBd(parseInt(v[0])) + '.' + this.engToBd(parseInt(v[1]));
    }
    console.log();
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

  engToBnWord(number) {
    if (number >= 1000000000) {
      return 'সীমার বাইরে';
    } else if (number >= 10000000) {
      return (
        this.engToBnWord(Math.floor(number / 10000000)) +
        this.crore +
        this.engToBnWord(number % 10000000)
      );
    } else if (number >= 100000) {
      return (
        this.engToBnWord(Math.floor(number / 100000)) +
        this.lakh +
        this.engToBnWord(number % 100000)
      );
    } else if (number >= 1000) {
      return (
        this.engToBnWord(Math.floor(number / 1000)) +
        this.thousand +
        this.engToBnWord(number % 1000)
      );
    } else if (number >= 100) {
      return (
        this.engToBnWord(Math.floor(number / 100)) +
        this.hundred +
        this.engToBnWord(number % 100)
      );
    } else {
      return this.num_to_bd_word[number].value;
    }
  }
}
