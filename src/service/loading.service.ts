import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/internal/operators/map';
import { Loading } from 'src/shared/model/loading.model';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  serviceUrl = 'loading';

  private _loadingSource = new BehaviorSubject<Loading[]>([]);
  loadings$ = this._loadingSource.asObservable();
  loadings: Loading[] = [];

  constructor(private afs: AngularFirestore) {
    this.getAndStoreAll();
  }

  create(object: Loading) {
    delete object['_id'];
    object.createdAt = new Date();
    return this.afs.collection(this.serviceUrl).add({
      ...object,
    });
  }

  getAndStoreAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('s_r_date'))
      .snapshotChanges()
      .subscribe((data) => {
        this.loadings = [];
        data.forEach((resp) => {
          let cls = resp.payload.doc.data() as Loading;
          cls._id = resp.payload.doc.id;
          this.loadings.push(cls);
        });
        this._loadingSource.next(this.loadings);
      });
  }

  getAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('serialNo'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Loading;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  get(id):Observable<any> {
    return this.afs.doc(this.serviceUrl + '/' + id).valueChanges();
  }

  update(id, object: Loading) {
    delete object['_id'];
    return this.afs.doc(this.serviceUrl + '/' + id).update({
      ...object,
    });
  }

  delete(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).delete();
  }
}
