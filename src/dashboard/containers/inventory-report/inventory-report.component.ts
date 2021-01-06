import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/service/inventory.service';
import { Inventory } from 'src/shared/model/inventory.model';
import { AgentService } from 'src/service/agent.service';
import { CustomerService } from 'src/service/customer.service';
import { UtilService } from 'src/service/util.service';
import { Agent } from 'src/shared/model/agent.model';
import { take } from 'rxjs/operators';
import { CompanyInfo } from 'src/shared/data/company.data';


@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.scss']
})
export class InventoryReportComponent implements OnInit {
  year;
  company_info = CompanyInfo;
  mode: string = 'agent';
  inventoryList: Inventory[] = [];
  agentList: Agent[] = [];
  customerList: Agent[] = [];
  filteredInventoryList: Inventory[] = [];

  total = 0;

  constructor(private inventoryService: InventoryService, private util: UtilService,
    private agentService: AgentService, private customerService: CustomerService) {
    this.year = new Date().getFullYear();
    this.getAgentList();
    this.getCustomerList();
  }

  ngOnInit(): void {
    this.getInventoryByYear(this.year);
  }

  async getInventoryByYear(year: number) {
    this.inventoryService.inventorys$.pipe(take(2)).subscribe(data => {
      this.inventoryList = data.filter(f => f.year == year);
    })
  }

  async getCustomerList() {
    this.customerService.customers$.pipe(take(2)).subscribe((data) => {
      this.customerList = data;
      this.customerList.sort(this.util.dynamicSortObject('priority'));
    });
  }

  async getAgentList() {
    this.agentService.agents$.pipe(take(2)).subscribe((data) => {
      this.agentList = data;
      this.agentList.sort(this.util.dynamicSortObject('name'));
    });
  }

  onModechange(event) {
    this.mode = event;
  }

  onCustomerClick(customerId) {
    this.filteredInventoryList = this.inventoryList.filter(f => f.customer._id == customerId);
    this.calculateTotalQuantity();
  }

  onAgentClick(agentId) {
    this.filteredInventoryList = this.inventoryList.filter(f => f.agent != null && f.agent._id == agentId);
    this.calculateTotalQuantity();
  }

  calculateTotalQuantity() {
    let t = 0;
    this.filteredInventoryList.forEach(f => {
      t += f.quantity;
    })
    this.total = t;
  }
  onPrint() {
    window.print();
  }
}
