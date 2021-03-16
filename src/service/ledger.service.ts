import { Injectable } from '@angular/core';
import { Ledger, LedgerPage } from 'src/shared/model/ledger.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';
import { RestDataService } from './rest-data.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LedgerService {
  ledgerUrl = 'api/ledger';
  serviceUrl = 'ledger';

  private _ledgerSource = new BehaviorSubject<Ledger[]>([]);
  ledgers$ = this._ledgerSource.asObservable();
  ledgers: Ledger[] = [];

  constructor(private dtSrc: RestDataService, private afs: AngularFirestore) {
    this.getAndStoreAll();
  }

  create(ledger: Ledger): Observable<Ledger> {
    return this.dtSrc.sendRequest('POST', this.ledgerUrl, ledger, true, null);
  }

  getLedgerList(
    page: number = 1,
    limit: number = 8,
    sort: string = 'name',
    order: string = 'asc',
    param: string = ''
  ): Observable<LedgerPage> {
    let sparam = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sort', sort)
      .set('order', order)
      .set('param', param);

    return this.dtSrc.sendRequest('GET', this.ledgerUrl, null, true, sparam);
  }

  findByDateRange(start, end): Observable<LedgerPage> {
    let sparam = new HttpParams().set('start', start).set('end', end);
    return this.dtSrc.sendRequest(
      'GET',
      this.ledgerUrl + '/daterange',
      null,
      true,
      sparam
    );
  }

  get(id) {
    return this.dtSrc.sendRequest(
      'GET',
      this.ledgerUrl + `/${id}`,
      null,
      true,
      null
    );
  }

  update(id, ledger: Ledger): Observable<Ledger> {
    return this.dtSrc.sendRequest(
      'PUT',
      this.ledgerUrl + `/${id}`,
      ledger,
      true,
      null
    );
  }

  // FIRE ---------------------------------------------------
  fcreate(object: Ledger) {
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

  fgetAll() {
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

  fget(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).valueChanges();
  }

  fupdate(id, object: Ledger) {
    delete object['_id'];
    return this.afs.doc(this.serviceUrl + '/' + id).update({
      ...object,
    });
  }

  fdelete(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).delete();
  }
}
