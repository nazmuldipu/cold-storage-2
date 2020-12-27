import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Chamber } from 'src/shared/model/chamber.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChamberService {
  serviceUrl = 'chamber';

  private _chamberSource = new BehaviorSubject<Chamber[]>([]);
  chambers$ = this._chamberSource.asObservable();
  chambers: Chamber[] = [];

  constructor(private afs: AngularFirestore) {
    this.getAndStoreAll();
  }

  create(object: Chamber) {
    delete object['_id'];
    object.createdAt = new Date();
    object.version = 1;
    return this.afs.collection(this.serviceUrl).add({
      ...object,
    });
  }

  getAndStoreAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('slug'))
      .snapshotChanges()
      .subscribe((data) => {
        this.chambers = [];
        data.forEach((resp) => {
          let cls = resp.payload.doc.data() as Chamber;
          cls._id = resp.payload.doc.id;
          this.chambers.push(cls);
        });
        this._chamberSource.next(this.chambers);
      });
  }

  getAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('serialNo'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Chamber;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  get(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).valueChanges();
  }

  update(id, object: Chamber) {
    delete object['_id'];
    object.version = object.version ? object.version + 1 : 1;
    return this.afs.doc(this.serviceUrl + '/' + id).update({
      ...object,
    });
  }

  delete(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).delete();
  }
}
