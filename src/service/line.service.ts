import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Line } from 'src/shared/model/line.model';

@Injectable({
  providedIn: 'root',
})
export class LineService {
  serviceUrl = 'line';

  private _lineSource = new BehaviorSubject<Line[]>([]);
  lines$ = this._lineSource.asObservable();
  lines: Line[] = [];

  constructor(private afs: AngularFirestore) {
    this.getAndStoreAll();
  }

  create(object: Line) {
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
        this.lines = [];
        data.forEach((resp) => {
          let cls = resp.payload.doc.data() as Line;
          cls._id = resp.payload.doc.id;
          this.lines.push(cls);
        });
        this._lineSource.next(this.lines);
      });
  }

  getAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('serialNo'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Line;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  get(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).valueChanges();
  }

  update(id, object: Line) {
    delete object['_id'];
    return this.afs.doc(this.serviceUrl + '/' + id).update({
      ...object,
    });
  }

  delete(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).delete();
  }
}
