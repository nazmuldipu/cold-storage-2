import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';
import { InventoryService } from './../../../service/inventory.service';
import { UtilService } from './../../../service/util.service';
import { LedgerService } from './../../../service/ledger.service';
import { Loan } from 'src/shared/model/loan.model';
import { CurrencyBdPipe } from 'src/shared/pipe/currency-bd.pipe';
import { DeliveryService } from 'src/service/delivery.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  user;
  year;
  head_data = [
    {
      label: 'ইনভেন্টরি',
      icon: 'fa-print',
      color: '#1976d2',
      background: '#64b5f6',
      values: [
        { label: 'This year', amount: '0' },
        { label: 'Today', amount: '0' },
      ],
    },
    {
      label: 'লেজার',
      icon: 'fa-usd',
      color: '#303f9f',
      background: '#7986cb',
      values: [
        { label: 'This year', amount: '0' },
        { label: 'Today', amount: '0' },
      ],
    },
    {
      label: 'লোন',
      background: '#4dd0e1',
      icon: 'fas fa-money',
      color: '#0097a7',
      values: [
        { label: 'This year', amount: '0' },
        { label: 'Today', amount: '0' },
      ],
    },
    {
      label: 'ডেলিভারি',
      icon: 'fa-truck',
      color: '#00796b',
      background: '#4db6ac',
      values: [
        { label: 'This year', amount: '0' },
        { label: 'Today', amount: '0' },
      ],
    },
  ];
  quickLinks: QuickLinks[];

  constructor(
    public auth: AuthService,
    private router: Router,
    private inventoryService: InventoryService,
    private ledgerService: LedgerService,
    private deliveryService: DeliveryService,
    private util: UtilService
  ) {
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.getInventoryReport(this.year);
    this.getLedgerReport(this.year);
    this.getLoanReport(this.year);
    this.getDeliveryReport(this.year);

    this.quickLinks = [
      { name: 'Add Inventory', url: '/dashboard/inventory' },
      { name: 'Pallot', url: '/dashboard/pallot' },
      { name: 'Ledger', url: '/dashboard/ledger-add' },
      { name: 'Delivery', url: '/dashboard/delivery' },
    ];

    this.auth.user$.subscribe((data) => {
      if (data) {
        this.user = { _id: data.uid, email: data.email };
      } else {
        this.user = null;
      }
    });
  }

  async getInventoryReport(year: number) {
    await this.inventoryService.inventorys$.subscribe((data) => {
      this.updateHeadObject('ইনভেন্টরি', year, data, 'date', 'quantity');
    });
  }

  async getLedgerReport(year: number) {
    await this.ledgerService.ledgers$.subscribe((data) => {
      this.updateHeadObject('লেজার', year, data, 'createdAt', 'total_amount');
    });
  }

  async getLoanReport(year: number) {
    await this.ledgerService.ledgers$.subscribe((data) => {
      const value = data.map((d) => new Loan(d));
      this.updateHeadObject('লোন', year, value, 'createdAt', 'payable');
    });
  }

  async getDeliveryReport(year: number) {
    await this.deliveryService.deliverys$.subscribe((data) => {
      this.updateHeadObject('ডেলিভারি', year, data, 'createdAt', 'total');
    });
  }

  updateHeadObject(label, year, data, datePath, countPath) {
    const yearCount = this.getTotal(
      data.filter((d) => d.year === year),
      countPath
    );
    const dayCount = this.getTotal(
      data.filter(
        (f) =>
          f[datePath]['seconds'] >= this.util.getStartDate().getTime() / 1000 &&
          f[datePath]['seconds'] <= this.util.getEndDate().getTime() / 1000
      ),
      countPath
    );

    const index = this.head_data.findIndex((hd) => hd.label === label);
    const obj = { ...this.head_data[index] };
    obj.values = [
      { label: 'এই বছর', amount: yearCount },
      { label: 'অদ্যকার', amount: dayCount },
    ];
    this.head_data.splice(index, 1, obj);
  }

  getTotal(data, countPath): string {
    let total: number = 0;
    data.forEach((it) => {
      total += parseInt(it[countPath]);
    });
    return total > 0 ? new CurrencyBdPipe().transform(total) : '০';
  }

  isAuthenticated() {
    return !!this.user;
  }

  onLinkClick(event) {
    console.log(event.value);
    this.router.navigate([event.value.url]);
  }
}

interface QuickLinks {
  name: string;
  url: string;
}
