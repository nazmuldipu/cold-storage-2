import { Component, Input } from '@angular/core';
import { Delivery } from 'src/shared/model/delivery.model';

@Component({
  selector: 'delivery-table',
  templateUrl: './delivery-table.component.html',
  styleUrls: ['./delivery-table.component.scss'],
})

export class DeliveryTableComponent {
  @Input() deliveryList: Delivery[];
  @Input() list: boolean = false;
  
  tableName = 'Delivery Table';
  columns = [
    { path: '#', label: '#', className: 'font-weight-bold' },
    {
      path: 'createdAt',
      label: 'Date',
      pipe: 'date',
      pipeArgs: 'dd/MM/yyyy',
      totalLabel: true,
    },
    { path: 'sr_no', label: 'SR No.', searchable: true },
    { path: 'customer.name', label: 'Party', searchable: true },
    { path: 'customer.phone', label: 'Phone', searchable: true },
    {
      path: 'quantity',
      label: 'Quantity',
      pipe: 'currencyBd',
      className: 'text-right',
      total: true,
    },
    {
      path: 'service_rent',
      label: 'Rent',
      pipe: 'currencyBd',
      className: 'text-right',
      total: true,
    },
    {
      path: 'emptyBag_amount',
      label: 'Empty bag',
      pipe: 'currencyBd',
      className: 'text-right',
      total: true,
    },
    {
      path: 'loan_payable',
      label: 'Loan',
      pipe: 'currencyBd',
      className: 'text-right',
      total: true,
    },
    {
      path: 'total',
      label: 'Total',
      pipe: 'currencyBd',
      className: 'text-right',
      total: true,
    },
  ];

  sortColumn = { path: 'createdAt', order: 'desc' };

  constructor() {}
}
