import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pallot } from 'src/shared/model/pallot.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class PallotService {
  serviceUrl = 'pallot';

  private _pallotSource = new BehaviorSubject<Pallot[]>([]);
  pallots$ = this._pallotSource.asObservable();
  pallots: Pallot[] = [];

  constructor(private afs: AngularFirestore) {
    this.getAndStoreAll();
  }

  create(object: Pallot) {
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
        this.pallots = [];
        data.forEach((resp) => {
          let cls = resp.payload.doc.data() as Pallot;
          cls._id = resp.payload.doc.id;
          this.pallots.push(cls);
        });
        this._pallotSource.next(this.pallots);
      });
  }

  getAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('serialNo'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Pallot;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  get(id): Observable<any> {
    return this.afs.doc(this.serviceUrl + '/' + id).valueChanges();
  }

  update(id, object: Pallot) {
    delete object['_id'];
    return this.afs.doc(this.serviceUrl + '/' + id).update({
      ...object,
    });
  }

  delete(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).delete();
  }
}
