import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/internal/operators/map';
import { Floor } from 'src/shared/model/floor.model';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  serviceUrl = 'floor';

  private _floorSource = new BehaviorSubject<Floor[]>([]);
  floors$ = this._floorSource.asObservable();
  floors: Floor[] = [];

  constructor(private afs: AngularFirestore) {
    this.getAndStoreAll();
  }

  create(object: Floor) {
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
        this.floors = [];
        data.forEach((resp) => {
          let cls = resp.payload.doc.data() as Floor;
          cls._id = resp.payload.doc.id;
          this.floors.push(cls);
        });
        this._floorSource.next(this.floors);
      });
  }

  getAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('serialNo'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Floor;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  get(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).valueChanges();
  }

  update(id, object: Floor) {
    delete object['_id'];
    return this.afs.doc(this.serviceUrl + '/' + id).update({
      ...object,
    });
  }

  delete(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).delete();
  }
}
