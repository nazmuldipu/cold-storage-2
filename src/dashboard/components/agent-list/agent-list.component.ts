import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Agent } from 'src/shared/model/agent.model';

@Component({
  selector: 'agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss'],
})
export class AgentListComponent {
  @Input() agentList: Agent[];
  @Input() short: boolean;

  @Output() edit = new EventEmitter<string>();

  tableName = 'Agent Table';
  columns = [
    { path: '#', label: '#', className: 'font-weight-bold' },
    {
      path: 'name',
      label: 'Name',
      searchable: true,
    },
    { path: 'father', label: 'Father' },
    { path: 'phone', label: 'Phone', searchable: true },
    {
      key: '_id',
      content: (agent) => {
        return `<a class="edit_link" onclick='Window.agentList.onEdit("${agent._id}")'>Select</a>`;
      },
    },
  ];

  sortColumn = { path: 'name', order: 'asc' };

  constructor() {
    Window['agentList'] = this;
  }

  onEdit(id) {
    this.edit.emit(id);
  }
}
