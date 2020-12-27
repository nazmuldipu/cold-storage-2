import { Component, OnInit } from '@angular/core';
import { AgentService } from 'src/service/agent.service';
import { UtilService } from 'src/service/util.service';
import { Agent } from 'src/shared/model/agent.model';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss'],
})
export class AgentComponent implements OnInit {
  sendingData = false;
  loadingData = false;
  agentList: Agent[] = [];
  agent: Agent;

  page = 1;
  pageSize = 8;
  agentPage: Agent[] = [];
  errorMessage = '';

  constructor(private agentService: AgentService, private util: UtilService) {}

  ngOnInit(): void {
    this.getAgentList();
  }

  async getAgentList() {
    this.agentService.agents$.subscribe((data) => {
      this.agentList = data;
      this.agentList.sort(this.util.dynamicSortObject('priority'));
      this.refreshAgent();
    });
  }

  refreshAgent() {
    this.agentPage = this.agentList
      .map((chamber, i) => ({ id: i + 1, ...chamber }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  async onCreate(event: Agent) {
    this.sendingData = true;
    const value = {
      ...event,
      slug: this.util.string_to_slug(event.name),
    } as Agent;
    await this.agentService
      .create(value)
      .then((ref) => {
        console.log(ref);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
  async onUpdate(event: Agent) {
    this.sendingData = true;
    const value = {
      ...event,
      slug: event.name.toLowerCase(),
      createdAt: this.agent.createdAt,
    };
    await this.agentService
      .update(this.agent._id, value)
      .then(() => {
        this.sendingData = false;
      })
      .catch((error) => {
        this.sendingData = false;
        (this.errorMessage = 'Group Updating ERROR ! '), error;
      });
    this.clear();
  }

  async onDelete(id) {
    this.sendingData = true;
    if (confirm('Are you sure to delete')) {
      await this.agentService
        .delete(id)
        .then(() => {
          this.sendingData = false;
        })
        .catch((error) => {
          this.sendingData = false;
          (this.errorMessage = 'Agent Deleting ERROR ! '), error;
        });
      this.clear();
    }
  }

  onEdit(id) {
    this.agent = this.agentList.find((cp) => cp._id === id);
  }

  clear() {
    this.agent = null;
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }
}
