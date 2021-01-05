import { Injectable } from '@angular/core';
import { Ledger } from 'src/shared/model/ledger.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  serviceUrl = 'ledger';

  private _ledgerSource = new BehaviorSubject<Ledger[]>([]);
  ledgers$ = this._ledgerSource.asObservable();
  ledgers: Ledger[] = [];

  constructor(private afs: AngularFirestore) {
    this.getAndStoreAll();
  }

  create(object: Ledger) {
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
        this.ledgers = [];
        data.forEach((resp) => {
          let cls = resp.payload.doc.data() as Ledger;
          cls._id = resp.payload.doc.id;
          this.ledgers.push(cls);
        });
        this._ledgerSource.next(this.ledgers);
      });
  }

  getAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('sr_no'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Ledger;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  get(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).valueChanges();
  }

  update(id, object: Ledger) {
    delete object['_id'];
    return this.afs.doc(this.serviceUrl + '/' + id).update({
      ...object,
    });
  }

  delete(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).delete();
  }
}
