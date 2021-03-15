import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Agent, AgentPage } from 'src/shared/model/agent.model';
import { RestDataService } from './rest-data.service';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  agentUrl = 'api/agent';

  serviceUrl = 'agent';

  private _agentSource = new BehaviorSubject<Agent[]>([]);
  agents$ = this._agentSource.asObservable();
  agents: Agent[] = [];

  constructor(private dataSource: RestDataService, private afs: AngularFirestore) {
    this.getAndStoreAll();
  }

  create(agent: Agent):Observable<Agent>{
    return this.dataSource.sendRequest('POST', this.agentUrl, agent, true, null);
  }

  getAgentList(
    page: number = 1,
    limit: number = 8,
    sort: string = 'name',
    order: string = 'asc',
    param: string = ''
  ): Observable<AgentPage> {
    let sparam = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sort', sort)
      .set('order', order)
      .set('param', param);

    return this.dataSource.sendRequest('GET', this.agentUrl, null, true, sparam);
  }

  update(id, customer: Agent): Observable<Agent> {
    return this.dataSource.sendRequest(
      'PUT',
      this.agentUrl + `/${id}`,
      customer,
      true,
      null
    );
  }

  delete(id): Observable<Agent> {
    return this.dataSource.sendRequest(
      'DELETE',
      this.agentUrl + `/${id}`,
      null,
      true,
      null
    );
  }

  // Fires ------------------------------------------------

  fcreate(object: Agent) {
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
        this.agents = [];
        data.forEach((resp) => {
          let cls = resp.payload.doc.data() as Agent;
          cls._id = resp.payload.doc.id;
          this.agents.push(cls);
        });
        this._agentSource.next(this.agents);
      });
  }

  fgetAll() {
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

  fget(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).valueChanges();
  }

  fupdate(id, object: Agent) {
    delete object['_id'];
    return this.afs.doc(this.serviceUrl + '/' + id).update({
      ...object,
    });
  }

  fdelete(id) {
    return this.afs.doc(this.serviceUrl + '/' + id).delete();
  }
}
