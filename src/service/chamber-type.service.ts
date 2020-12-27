import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/internal/operators/map';
import { ChamberType } from 'src/shared/model/chamber-type.model';

@Injectable({
  providedIn: 'root'
})
export class ChamberTypeService {

  serviceUrl = 'chamber-type';

  private _chamberTypeSource = new BehaviorSubject<ChamberType[]>([]);
  chamberTypes$ = this._chamberTypeSource.asObservable();
  chamberTypes: ChamberType[] = [];

  constructor(private afs: AngularFirestore) {
    this.getAndStoreAll();
  }

  create(object: ChamberType) {
    delete object['_id'];
    object.createdAt = new Date();
    return this.afs.collection(this.serviceUrl).add({
      ...object,
    });
  }

  getAndStoreAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('slug'))
      .snapshotChanges()
      .subscribe((data) => {
        this.chamberTypes = [];
        data.forEach((resp) => {
          let cls = resp.payload.doc.data() as ChamberType;
          cls._id = resp.payload.doc.id;
          this.chamberTypes.push(cls);
        });
        this._chamberTypeSource.next(this.chamberTypes);
      });
  }

  getAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('serialNo'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as ChamberType;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  get(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).valueChanges();
  }

  update(id, object: ChamberType) {
    delete object['_id'];
    return this.afs.doc(this.serviceUrl + '/' + id).update({
      ...object,
    });
  }

  delete(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).delete();
  }
}
