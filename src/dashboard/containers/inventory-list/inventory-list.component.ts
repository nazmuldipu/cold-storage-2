import { Component } from '@angular/core';
import { AgentService } from 'src/service/agent.service';
import { CustomerService } from 'src/service/customer.service';
import { InventoryService } from 'src/service/inventory.service';
import { UtilService } from 'src/service/util.service';
import { CompanyInfo } from 'src/shared/data/company.data';
import { AgentPage } from 'src/shared/model/agent.model';
import { Inventory } from 'src/shared/model/inventory.model';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
})
export class InventoryListComponent{
  year;
  company_info = CompanyInfo;
  mode: string = 'agent';
  inventoryList: Inventory[] = [];
  agentPage: AgentPage;
  customerPage: AgentPage;

  total = 0;

  constructor(
    private inventoryService: InventoryService,
    private agentService: AgentService,
    private customerService: CustomerService
  ) {
    this.year = new Date().getFullYear();
    this.getAgentList();
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
      this.customerPage = await this.customerService
        .getCustomerList(page, limit, sort, order, param)
        .toPromise();
    } catch (error) {}
  }
  refreshCustomerData({ page, limit, sort, order, search }) {
    this.getCustomerList(page, limit, sort, order, search);
  }

  async getAgentList(
    page: number = 1,
    limit: number = 8,
    sort: string = 'name',
    order: string = 'asc',
    param: string = ''
  ) {
    try {
      this.agentPage = await this.agentService
        .getAgentList(page, limit, sort, order, param)
        .toPromise();
    } catch (error) {}
  }

  refreshAgentData({ page, limit, sort, order, search }) {
    this.getAgentList(page, limit, sort, order, search);
  }

  onModechange(event) {
    this.mode = event;
  }

  async onCustomerClick(customerId) {
    console.log(customerId);
    try {
      this.inventoryList = await this.inventoryService
        .findByCustomerId(customerId)
        .toPromise();
      this.calculateTotalQuantity();
    } catch (error) {
      console.log(error);
    }
  }

  async onAgentClick(agentId) {
    try {
      this.inventoryList = await this.inventoryService
        .findByAgentId(agentId)
        .toPromise();
      this.calculateTotalQuantity();
    } catch (error) {
      console.log(error);
    }
  }

  calculateTotalQuantity() {
    let t = 0;
    this.inventoryList.forEach((f) => {
      t += parseInt(f.quantity + '');
    });
    this.total = t;
  }

  onPrint() {
    window.print();
  }
}
