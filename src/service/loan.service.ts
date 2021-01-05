import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Loan } from 'src/shared/model/loan.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  serviceUrl = 'loan';

  private _loanSource = new BehaviorSubject<Loan[]>([]);
  loans$ = this._loanSource.asObservable();
  loans: Loan[] = [];

  constructor(private afs: AngularFirestore) {
    this.getAndStoreAll();
  }

  create(object: Loan) {
    delete object['_id'];
    object.createdAt = new Date();
    return this.afs.collection(this.serviceUrl).add({
      ...object,
    });
  }

  getAndStoreAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('sr_no'))
      .snapshotChanges()
      .subscribe((data) => {
        this.loans = [];
        data.forEach((resp) => {
          let cls = resp.payload.doc.data() as Loan;
          cls._id = resp.payload.doc.id;
          this.loans.push(cls);
        });
        this._loanSource.next(this.loans);
      });
  }

  getAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('sr_no'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Loan;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  get(id): Observable<any> {
    return this.afs.doc(this.serviceUrl + '/' + id).valueChanges();
  }

  update(id, object: Loan) {
    delete object['_id'];
    return this.afs.doc(this.serviceUrl + '/' + id).update({
      ...object,
    });
  }

  delete(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).delete();
  }
}
