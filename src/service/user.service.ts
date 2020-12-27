import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/operators';
import { User } from 'src/shared/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  serviceUrl = 'user';

  private _userSource = new BehaviorSubject<User[]>([]);
  users$ = this._userSource.asObservable();
  users: User[] = [];

  constructor(private afs: AngularFirestore) {
    this.getAndStoreAll();
  }

  create(object: User) {
    delete object['_id'];
    object.createdAt = new Date();
    object.version = 1;
    return this.afs.collection(this.serviceUrl).add({
      ...object,
    });
  }

  saveRegisteredUser(uid, name, email, password) {
    return this.afs.collection(this.serviceUrl).doc(uid).set({
      name: name,
      email: email,
      password: password,
      role: 'USER'
    });
  }

  getAndStoreAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('email'))
      .snapshotChanges()
      .subscribe((data) => {
        this.users = [];
        data.forEach((resp) => {
          let cls = resp.payload.doc.data() as User;
          cls._id = resp.payload.doc.id;
          this.users.push(cls);
        });
        this._userSource.next(this.users);
      });
  }

  getAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('serialNo'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as User;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  get(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).valueChanges();
  }

  update(id, object: User) {
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
