import { Component, Input } from '@angular/core';
import { Delivery } from 'src/shared/model/delivery.model';

@Component({
  selector: 'delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss'],
})
export class DeliveryListComponent {
  @Input() deliveryList: Delivery[];

  @Input() list: boolean;

  tableName = 'Delivery Table';
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
    { path: 'customer.name', label: 'Customer' },

    { path: 'service_rent', label: 'Rent' },
    { path: 'emptyBag_amount', label: 'Empty bag' },
    { path: 'loan_payable', label: 'Loan' },
    {
      path: 'total',
      label: 'Total',
      pipe: 'currencyBd',
      className: 'text-right',
      total: true,
    },
    {
      key: '_id',
      type: 'link',
      content: (delivery) => {
        return {
          classname: 'edit_link d-print-none',
          text: 'Print',
          link: `/dashboard/delivery-print/${delivery._id}`,
        };
      },
    },
  ];
  sortColumn = { path: 'date', order: 'desc' };

  constructor() {}
}
