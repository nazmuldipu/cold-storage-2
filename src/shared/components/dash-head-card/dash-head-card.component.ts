import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'dash-head-card',
  templateUrl: './dash-head-card.component.html',
  styleUrls: ['./dash-head-card.component.scss'],
})
export class DashHeadCardComponent{
  @Input() head_data;
}
