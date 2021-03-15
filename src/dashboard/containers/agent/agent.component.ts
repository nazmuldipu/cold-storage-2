import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/service/agent.service';
import { UtilService } from 'src/service/util.service';
import { Agent, AgentPage } from 'src/shared/model/agent.model';
import _ from 'lodash';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss'],
})
export class AgentComponent implements OnInit {
  sendingData = false;
  loadingData = false;
  agentPage: AgentPage;
  // agentList: Agent[] = [];
  agent: Agent;

  errorMessage = '';

  constructor(private agentService: AgentService, private util: UtilService) {}

  ngOnInit(): void {
    this.getAgentList();
  }

  async getAgentList(
    page: number = 1,
    limit: number = 8,
    sort: string = 'name',
    order: string = 'asc',
    param: string = ''
  ) {
    try {
      this.loadingData = true;
      this.agentPage = await this.agentService
        .getAgentList(page, limit, sort, order, param)
        .toPromise();
      this.loadingData = false;
    } catch (error) {}
  }

  refreshData({ page, limit, sort, order, search }) {
    this.getAgentList(page, limit, sort, order, search);
  }

  onEdit(id) {
    this.agent = this.agentPage.docs.find((cp) => cp._id === id);
  }

  async onCreate(event: Agent) {
    try {
      this.sendingData = true;
      const resp = await this.agentService.create(event).toPromise();
      console.log(resp);
      this.agentPage.docs.push(resp);
      this.sendingData = false;
    } catch (err) {
      this.errorMessage = err;
    }
  }

  async onUpdate(event: Agent) {
    try {
      this.sendingData = true;
      this.errorMessage = '';
      const resp = await this.agentService
        .update(this.agent._id, event)
        .toPromise();
      this.getAgentList();
      this.sendingData = false;
    } catch (err) {
      this.errorMessage = err;
    }
  }

  async onDelete(id) {
    if (confirm('Are you sure to delete')) {
      try {
        const resp = await this.agentService.delete(id).toPromise();
        const index = this.agentPage.docs.findIndex((f) => f._id === id);
        if (index > -1) {
          this.agentPage.docs.splice(index, 1);
        }
      } catch (err) {
        this.errorMessage = err;
      }
      this.clear();
    }
  }

  clear() {
    this.agent = null;
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }

  async onTranferClick() {
    this.agentService.agents$.subscribe((data) => {
      data.forEach(async (d) => {
        var result = _.omit(d, ['_id', 'slug', 'createdAt']);
        const res = await this.agentService.create(result).toPromise();
        console.log(res);
      });
    });
  }
}
