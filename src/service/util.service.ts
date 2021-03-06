import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(private firestore: AngularFirestore) { }

  dynamicSortObject(property) {
    let prop = property.split('.');
    let len = prop.length;

    if (len < 2) {
      var sortOrder = 1;
      if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a, b) {
        var result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    } else if (len >= 2) {
      return function (a, b) {
        var i = 0;
        while (i < len) {
          a = a[prop[i]];
          b = b[prop[i]];
          i++;
        }
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      };
    }
  }

  string_to_slug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    var to = 'aaaaeeeeiiiioooouuuunc------';
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }


  convertFireabaseDateToJSDate(firebaseObject: any): Date {
    if (!firebaseObject) return null;
    return (firebaseObject as firebase.firestore.Timestamp).toDate();
  }

  convertFireabaseDateToNgbDate(firebaseObject: any): NgbDate {
    if (!firebaseObject) return null;
    const date = (firebaseObject as firebase.firestore.Timestamp).toDate();
    return new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  convertNgbDateToJsDate(ngDate: NgbDate): Date {
    return new Date(ngDate.year, ngDate.month - 1, ngDate.day)
  }

  convertJsDateToNgbDate(date: Date): NgbDate {
    return new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }
}
