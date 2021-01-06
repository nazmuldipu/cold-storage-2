import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Agent } from 'src/shared/model/agent.model';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnChanges {
  @Input() agentList: Agent[];
  @Input() short: boolean;

  @Output() edit = new EventEmitter<string>();

  searching = false;
  page = 1;
  pageSize = 8;
  agentPage: Agent[] = [];
  agentSearch: Agent[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.agentList && this.agentList != null && this.agentList.length > 0) {
      this.refreshAgent();
    }
  }

  onEdit(id) {
    this.edit.emit(id);
  }

  refreshAgent() {
    this.agentPage = this.agentList
      .map((chamber, i) => ({ id: i + 1, ...chamber }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  onSearch(event) {
    if (event.length > 2) {
      this.searching = true;
      console.log(event, event.length);
      this.agentPage = this.search(event);
    } else {
      this.searching = false;
      this.refreshAgent();
    }
  }

  search(text: string): Agent[] {
    return this.agentList.filter((loading) => {
      const term = text.toLowerCase();
      return (
        loading.name.toLowerCase().includes(term) ||
        loading.phone.includes(term)
      );
    });
  }
}
