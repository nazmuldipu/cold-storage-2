import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map, take } from 'rxjs/operators';
import { User } from 'src/shared/model/user.model';
import { RestDataService } from './rest-data.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl = 'api/users';
  serviceUrl = 'user';

  _userSource = new BehaviorSubject<User>({} as User);
  user$ = this._userSource.asObservable();
  user: User;

  constructor(
    private dataSource: RestDataService,
    private afs: AngularFirestore
  ) {
    // this.getAndStoreAll();
  }

  userRegistration(user: User): Observable<User> {
    return this.dataSource.sendRequest('POST', this.userUrl, user, false, null);
  }

  getUserProfile(): Observable<User> {
    return this.dataSource.sendRequest(
      'GET',
      this.userUrl + '/me',
      null,
      true,
      null
    );
    // .subscribe(
    //   (data) => {
    //     console.log(data);
    //     this._userSource.next(data);
    //   },
    //   (error) => {
    //     console.log('getUserProfile ERROR');
    //     console.log(error);
    //   }
    // );
  }

  // FIRE ------------------------------------------------------
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
      role: 'USER',
    });
  }

  // getAndStoreAll() {
  //   return this.afs
  //     .collection(this.serviceUrl, (ref) => ref.orderBy('email'))
  //     .snapshotChanges()
  //     .subscribe((data) => {
  //       this.users = [];
  //       data.forEach((resp) => {
  //         let cls = resp.payload.doc.data() as User;
  //         cls._id = resp.payload.doc.id;
  //         this.users.push(cls);
  //       });
  //       this._userSource.next(this.users);
  //     });
  // }

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

  // get(id) {
  //   return this.afs.doc(this.serviceUrl + '/' + id).valueChanges();
  // }

  get(sid: string) {
    return this.afs
      .doc(this.serviceUrl + '/' + sid)
      .valueChanges()
      .pipe(
        take(1),
        map((ref) => {
          const value = { id: sid, ...(ref as User) };
          return value;
        })
      );
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
