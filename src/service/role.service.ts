import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from 'src/shared/model/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  serviceUrl = 'role';

  private _roleSource = new BehaviorSubject<Role[]>([]);
  roles$ = this._roleSource.asObservable();
  roles: Role[] = [];

  constructor(private afs: AngularFirestore) {
    this.getAndStoreAll();
  }

  create(object: Role) {
    // delete object['_id'];
    // object.createdAt = new Date();
    // object.version = 1;
    // return this.afs.collection(this.serviceUrl).add({
    //   ...object,
    // });
  }

  getAndStoreAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('slug'))
      .snapshotChanges()
      .subscribe((data) => {
        this.roles = [];
        data.forEach((resp) => {
          let cls = resp.payload.doc.data() as Role;
          cls._id = resp.payload.doc.id;
          this.roles.push(cls);
        });
        this._roleSource.next(this.roles);
      });
  }

  getAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('serialNo'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Role;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  get(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).valueChanges();
  }

  update(id, object: Role) {
    delete object['_id'];
    console.log(object);
    object.version = object.version ? object.version + 1 : 1;
    return this.afs.doc(this.serviceUrl + '/' + id).update({
      ...object,
    });
  }

  delete(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).delete();
  }
}
