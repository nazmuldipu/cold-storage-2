import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Pallot } from 'src/shared/model/pallot.model';

@Component({
  selector: 'pallot-list',
  templateUrl: './pallot-list.component.html',
  styleUrls: ['./pallot-list.component.scss']
})
export class PallotListComponent {
  @Input() pallotList: Pallot[];

  @Output() edit = new EventEmitter<any>();

  tableName = 'Pallot Table';
  columns = [
    { path: '#', label: '#', className: 'font-weight-bold' },
    {
      path: 'date',
      label: 'Date',
      pipe: 'date',
      pipeArgs: 'dd/MM/yyyy',
      totalLabel: true,
    },
    { path: 'sr_no', label: 'SR No.', searchable: true },
    { path: 'chamber.name', label: 'Chamber' },
    { path: 'floor.name', label: 'Floor' },
    { path: 'line.name', label: 'Pallot' },
    { path: 'pocket.name', label: 'Pocket' },
    
    {
      key: '_id',
      type: 'button',
      content: (pallot) => {
        return {
          classname: 'edit_link',
          text: 'Edit',
          event: { key: 'edit', id: pallot._id },
        };
      },
    },  
  ];

  sortColumn = { path: 'date', order: 'desc' };
  
  constructor() { }

  buttonEvent(event) {
    switch (event['key']) {
      case 'edit':
        this.edit.emit(event['id']);
        break;
    }
  }
}
