import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Delivery } from 'src/shared/model/delivery.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  serviceUrl = 'delivery';

  private _deliverySource = new BehaviorSubject<Delivery[]>([]);
  deliverys$ = this._deliverySource.asObservable();
  deliverys: Delivery[] = [];

  constructor(private afs: AngularFirestore) {
    this.getAndStoreAll();
  }

  create(object: Delivery) {
    delete object['_id'];
    object.createdAt = new Date();
    return this.afs.collection(this.serviceUrl).add({
      ...object,
    });
  }

  getAndStoreAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('year'))
      .snapshotChanges()
      .subscribe((data) => {
        this.deliverys = [];
        data.forEach((resp) => {
          let cls = resp.payload.doc.data() as Delivery;
          cls._id = resp.payload.doc.id;
          this.deliverys.push(cls);
        });
        this._deliverySource.next(this.deliverys);
      });
  }

  getAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('serialNo'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Delivery;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  get(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).valueChanges();
  }

  update(id, object: Delivery) {
    delete object['_id'];
    return this.afs.doc(this.serviceUrl + '/' + id).update({
      ...object,
    });
  }

  delete(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).delete();
  }
}
