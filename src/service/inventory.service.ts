import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/internal/operators/map';
import { Inventory, InventoryPage } from 'src/shared/model/inventory.model';
import { RestDataService } from './rest-data.service';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  inventoryUrl = 'api/inventory';
  serviceUrl = 'inventory';

  private _inventorySource = new BehaviorSubject<Inventory[]>([]);
  inventorys$ = this._inventorySource.asObservable();
  inventorys: Inventory[] = [];

  constructor(private dtSrc: RestDataService, private afs: AngularFirestore) {
    this.getAndStoreAll();
  }

  create(inventory: Inventory): Observable<Inventory> {
    return this.dtSrc.sendRequest(
      'POST',
      this.inventoryUrl,
      inventory,
      true,
      null
    );
  }

  getInventoryList(
    page: number = 1,
    limit: number = 8,
    sort: string = 'name',
    order: string = 'asc',
    param: string = ''
  ): Observable<InventoryPage> {
    let sparam = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sort', sort)
      .set('order', order)
      .set('param', param);

    return this.dtSrc.sendRequest('GET', this.inventoryUrl, null, true, sparam);
  }

  findByCustomerId(id): Observable<Inventory[]> {
    return this.dtSrc.sendRequest(
      'GET',
      this.inventoryUrl + `/customer/${id}`,
      null,
      true,
      null
    );
  }

  findByAgentId(id): Observable<Inventory[]> {
    return this.dtSrc.sendRequest(
      'GET',
      this.inventoryUrl + `/agent/${id}`,
      null,
      true,
      null
    );
  }

  findByDateRange(start, end): Observable<InventoryPage> {
    let sparam = new HttpParams().set('start', start).set('end', end);
    return this.dtSrc.sendRequest(
      'GET',
      this.inventoryUrl + '/daterange',
      null,
      true,
      sparam
    );
  }

  get(id) {
    return this.dtSrc.sendRequest(
      'GET',
      this.inventoryUrl + `/${id}`,
      null,
      true,
      null
    );
  }

  update(id, ineventory: Inventory): Observable<Inventory> {
    return this.dtSrc.sendRequest(
      'PUT',
      this.inventoryUrl + `/${id}`,
      ineventory,
      true,
      null
    );
  }

  delete(id): Observable<Inventory> {
    return this.dtSrc.sendRequest(
      'DELETE',
      this.inventoryUrl + `/${id}`,
      null,
      true,
      null
    );
  }

  count(): Observable<{ count: number }> {
    return this.dtSrc.sendRequest(
      'GET',
      this.inventoryUrl + `/count`,
      null,
      true,
      null
    );
  }
  //Fire ------------------------------------------

  fcreate(object: Inventory) {
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
        this.inventorys = [];
        data.forEach((resp) => {
          let cls = resp.payload.doc.data() as Inventory;
          cls._id = resp.payload.doc.id;
          this.inventorys.push(cls);
        });
        this._inventorySource.next(this.inventorys);
      });
  }

  fgetAll() {
    return this.afs
      .collection(this.serviceUrl, (ref) => ref.orderBy('serialNo'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Inventory;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  fget(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).valueChanges();
  }

  fupdate(id, object: Inventory) {
    delete object['_id'];
    object.version = object.version ? object.version + 1 : 1;
    return this.afs.doc(this.serviceUrl + '/' + id).update({
      ...object,
    });
  }

  fdelete(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).delete();
  }
}
