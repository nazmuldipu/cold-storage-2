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

  tableName = 'এজেন্ট টেবিল';
  columns = [
    { path: '#', label: '#', className: 'font-weight-bold' },
    {
      path: 'name',
      label: 'নাম',
      searchable: true,
    },
    { path: 'father', label: 'পিতা' },
    { path: 'phone', label: 'ফোন', searchable: true },
    {
      key: '_id',
      type: 'button',
      content: (agent) => {
        return {
          classname: 'edit_link',
          text: 'Edit',
          event: { key: 'edit', id: agent._id },
        };
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

  buttonEvent(event) {
    switch (event['key']) {
      case 'edit':
        this.edit.emit(event['id']);
        break;
    }
  }
}
