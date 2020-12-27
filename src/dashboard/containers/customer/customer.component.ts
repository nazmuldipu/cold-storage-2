import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/service/customer.service';
import { UtilService } from 'src/service/util.service';
import { Agent } from 'src/shared/model/agent.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  sendingData = false;
  loadingData = false;
  customerList: Agent[] = [];
  customer: Agent;

  page = 1;
  pageSize = 8;
  customerPage: Agent[] = [];
  errorMessage = '';

  constructor(
    private customerService: CustomerService,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.getCustomerList();   
  }

  async getCustomerList() {
    this.customerService.customers$.subscribe((data) => {
      this.customerList = data;
      this.customerList.sort(this.util.dynamicSortObject('priority'));
      this.refreshCustomer();
    });
  }

  refreshCustomer() {
    this.customerPage = this.customerList
      .map((customer, i) => ({ id: i + 1, ...customer }))
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
    await this.customerService
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
      createdAt: this.customer.createdAt,
    };
    await this.customerService
      .update(this.customer._id, value)
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
      await this.customerService
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
    this.customer = this.customerList.find((cp) => cp._id === id);
  }

  clear() {
    this.customer = null;
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }
}
