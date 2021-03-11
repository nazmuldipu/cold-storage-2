import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/internal/operators/map';
import { Agent } from 'src/shared/model/agent.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  serviceUrl = 'customer';

  private _customerSource = new BehaviorSubject<Agent[]>([]);
  customers$ = this._customerSource.asObservable();
  customers: Agent[] = [];

  constructor(private afs: AngularFirestore) {
    this.getAndStoreAll();
  }

  create(object: Agent) {
    delete object['_id'];
    object.createdAt = new Date();
    return this.afs.collection(this.serviceUrl).add({
      ...object,
    });
  }

  getAndStoreAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('name'))
      .snapshotChanges()
      .subscribe((data) => {
        this.customers = [];
        data.forEach((resp) => {
          let cls = resp.payload.doc.data() as Agent;
          cls._id = resp.payload.doc.id;
          this.customers.push(cls);
        });
        this._customerSource.next(this.customers);
      });
  }

  getAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('serialNo'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Agent;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  get(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).valueChanges();
  }

  update(id, object: Agent) {
    delete object['_id'];
    return this.afs.doc(this.serviceUrl + '/' + id).update({
      ...object,
    });
  }

  delete(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).delete();
  }
}
