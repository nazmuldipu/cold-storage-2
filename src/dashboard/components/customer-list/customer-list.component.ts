import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Agent } from 'src/shared/model/agent.model';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnChanges {
  @Input() customerList: Agent[];
  @Input() short: boolean;

  @Output() edit = new EventEmitter<string>();

  page = 1;
  pageSize = 8;
  searching = false;
  customerPage: Agent[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.customerList && this.customerList != null) {
      this.refreshCustomer();
    }
  }

  refreshCustomer() {
    this.customerPage = this.customerList
      .map((customer, i) => ({ id: i + 1, ...customer }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  onEdit(id) {
    this.edit.emit(id);
  }

  onSearch(event) {
    if (event.length > 2) {
      this.searching = true;
      console.log(event, event.length);
      this.customerPage = this.search(event);
    } else {
      this.searching = false;
      this.refreshCustomer();
    }
  }

  search(text: string): Agent[] {
    return this.customerList.filter((loading) => {
      const term = text.toLowerCase();
      return (
        loading.name.toLowerCase().includes(term) ||
        loading.phone.includes(term)
      );
    });
  }
}
