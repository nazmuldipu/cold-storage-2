import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from 'src/shared/model/product.model';

@Component({
  selector: 'product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent {
  @Input() productList: Product[];
  @Input() list: boolean = false;

  tableName = 'Product Table';
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
    { path: 'agent.name', label: 'Agent', searchable: true },
    {
      path: 'quantity',
      label: 'Quantity',
      pipe: 'currencyBd',
      className: 'text-right',
      total: true,
    },
    {
      path: 'rate',
      label: 'Rate',
      pipe: 'currencyBd',
      className: 'text-right',
    },
    {
      path: 'service_amount',
      label: 'Payable',
      pipe: 'currencyBd',
      className: 'text-right',
      total: true,
    },
  ];

  sortColumn = { path: 'createdAt', order: 'desc' };

  constructor() {}
}
