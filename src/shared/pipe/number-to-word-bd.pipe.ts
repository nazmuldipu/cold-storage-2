import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToWordBd'
})
export class NumberToWordBdPipe implements PipeTransform {

  num_to_bd = {
    '0': { value: '' },
    '1': { value: 'এক' }, '2': { value: 'দুই' }, '3': { value: 'তিন' }, '4': { value: 'চার' }, '5': { value: 'পাঁচ' },
    '6': { value: 'ছয়' }, '7': { value: 'সাত' }, '8': { value: 'আট' }, '9': { value: 'নয়' }, '10': { value: 'দশ' },
    '11': { value: 'এগার' }, '12': { value: 'বার' }, '13': { value: 'তের' }, '14': { value: 'চৌদ্দ' }, '15': { value: 'পনের' },
    '16': { value: 'ষোল' }, '17': { value: 'সতের' }, '18': { value: 'আঠার' }, '19': { value: 'ঊনিশ' }, '20': { value: 'বিশ' },
    '21': { value: 'একুশ' }, '22': { value: 'বাইশ' }, '23': { value: 'তেইশ' }, '24': { value: 'চব্বিশ' }, '25': { value: 'পঁচিশ' },
    '26': { value: 'ছাব্বিশ' }, '27': { value: 'সাতাশ' }, '28': { value: 'আঠাশ' }, '29': { value: 'ঊনত্রিশ' }, '30': { value: 'ত্রিশ' },
    '31': { value: 'একত্রিশ' }, '32': { value: 'বত্রিশ' }, '33': { value: 'তেত্রিশ' }, '34': { value: 'চৌত্রিশ' }, '35': { value: 'পঁয়ত্রিশ' },
    '36': { value: 'ছত্রিশ' }, '37': { value: 'সাঁইত্রিশ' }, '38': { value: 'আটত্রিশ' }, '39': { value: 'ঊনচল্লিশ' }, '40': { value: 'চল্লিশ' },
    '41': { value: 'একচল্লিশ' }, '42': { value: 'বিয়াল্লিশ' }, '43': { value: 'তেতাল্লিশ' }, '44': { value: 'চুয়াল্লিশ' }, '45': { value: 'পঁয়তাল্লিশ' },
    '46': { value: 'ছেচল্লিশ' }, '47': { value: 'সাতচল্লিশ' }, '48': { value: 'আটচল্লিশ' }, '49': { value: 'ঊনপঞ্চাশ' }, '50': { value: 'পঞ্চাশ' },
    '51': { value: 'একান্ন' }, '52': { value: 'বায়ান্ন' }, '53': { value: 'তিপ্পান্ন' }, '54': { value: 'চুয়ান্ন' }, '55': { value: 'পঞ্চান্ন' },
    '56': { value: 'ছাপ্পান্ন' }, '57': { value: 'সাতান্ন' }, '58': { value: 'আটান্ন' }, '59': { value: 'ঊনষাট' }, '60': { value: 'ষাট' },
    '61': { value: 'একষট্টি' }, '62': { value: 'বাষট্টি' }, '63': { value: 'তেষট্টি' }, '64': { value: 'চৌষট্টি' }, '65': { value: 'পঁয়ষট্টি' },
    '66': { value: 'ছেষট্টি' }, '67': { value: 'সাতষট্টি' }, '68': { value: 'আটষট্টি' }, '69': { value: 'ঊনসত্তর' }, '70': { value: 'সত্তর' },
    '71': { value: 'একাত্তর' }, '72': { value: 'বাহাত্তর' }, '73': { value: 'তিয়াত্তর' }, '74': { value: 'চুয়াত্তর' }, '75': { value: 'পঁচাত্তর' },
    '76': { value: 'ছিয়াত্তর' }, '77': { value: 'সাতাত্তর' }, '78': { value: 'আটাত্তর' }, '79': { value: 'ঊনআশি' }, '80': { value: 'আশি' },
    '81': { value: 'একাশি' }, '82': { value: 'বিরাশি' }, '83': { value: 'তিরাশি' }, '84': { value: 'চুরাশি' }, '85': { value: 'পঁচাশি' },
    '86': { value: 'ছিয়াশি' }, '87': { value: 'সাতাশি' }, '88': { value: 'আটাশি' }, '89': { value: 'ঊননব্বই' }, '90': { value: 'নব্বই' },
    '91': { value: 'একানব্বই' }, '92': { value: 'বিরানব্বই' }, '93': { value: 'তিরানব্বই' }, '94': { value: 'চুরানব্বই' }, '95': { value: 'পঁচানব্বই' },
    '96': { value: 'ছিয়ানব্বই' }, '97': { value: 'সাতানব্বই' }, '98': { value: 'আটানব্বই' }, '99': { value: 'নিরানব্বই' },
  };

  hundred = ' শত ';
  thousand = ' হাজার ';
  lakh = ' লক্ষ ';
  crore = ' কোটি ';

  transform(number: any, args?: any): any {
    if (number >= 1000000000) {
      return "সীমার বাইরে";
    }
    if (number >= 10000000) {
      return (
        this.transform(Math.floor(number / 10000000)) +
        this.crore +
        this.transform(number % 10000000)
      );
    } else if (number >= 100000) {
      return (
        this.transform(Math.floor(number / 100000)) +
        this.lakh +
        this.transform(number % 100000)
      );
    } else if (number >= 1000) {
      return (
        this.transform(Math.floor(number / 1000)) +
        this.thousand +
        this.transform(number % 1000)
      );
    } else if (number >= 100) {
      return (
        this.transform(Math.floor(number / 100)) +
        this.hundred +
        this.transform(number % 100)
      );
    } else {
      return this.num_to_bd[number].value;
    }
  }
}
