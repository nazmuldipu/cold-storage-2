import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/service/customer.service';
import { UtilService } from 'src/service/util.service';
import { Agent, AgentPage } from 'src/shared/model/agent.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  sendingData = false;
  loadingData = false;
  // customerList: Agent[] = [];
  customerPage: AgentPage;
  customer: Agent;

  errorMessage = '';

  constructor(
    private customerService: CustomerService,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.getCustomerList();
  }

  async getCustomerList(
    page: number = 1,
    limit: number = 8,
    sort: string = 'name',
    order: string = 'asc',
    param: string = ''
  ) {
    try {
      this.loadingData = true;
      this.customerPage = await this.customerService
        .getCustomerList(page, limit, sort, order, param)
        .toPromise();
      this.loadingData = false;
    } catch (error) {}
  }

  refreshData({ page, limit, sort, order, search }) {
    this.getCustomerList(page, limit, sort, order, search);
  }

  onEdit(id) {
    this.customer = this.customerPage.docs.find((cp) => cp._id === id);
  }

  async onCreate(event: Agent) {
    try {
      this.sendingData = true;
      this.errorMessage = '';
      const resp = await this.customerService.create(event).toPromise();
      this.customerPage.docs.push(resp);
      this.sendingData = false;
    } catch (err) {
      this.errorMessage = err;
    }
  }
  async onUpdate(event: Agent) {
    try {
      this.sendingData = true;
      this.errorMessage = '';
      const resp = await this.customerService
        .update(this.customer._id, event)
        .toPromise();
      this.getCustomerList();
      this.sendingData = false;
    } catch (err) {
      this.errorMessage = err;
    }
  }

  async onDelete(id) {
    if (confirm('Are you sure to delete')) {
      try {
        const resp = await this.customerService.delete(id).toPromise();
        const index = this.customerPage.docs.findIndex((f) => f._id === id);
        if (index > -1) {
          this.customerPage.docs.splice(index, 1);
        }
      } catch (err) {
        this.errorMessage = err;
      }
      this.clear();
    }
  }

  clear() {
    this.customer = null;
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }
}
