import { Component, Input } from '@angular/core';
import { Loan } from 'src/shared/model/loan.model';

@Component({
  selector: 'loan-table',
  templateUrl: './loan-table.component.html',
  styleUrls: ['./loan-table.component.scss'],
})
export class LoanTableComponent {
  @Input() loanList: Loan[];

  @Input() list: boolean = false;

  tableName = 'Loan Table';
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
      path: 'amount',
      label: 'Amount',
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
      path: 'profit',
      label: 'Profit',
      pipe: 'currencyBd',
      className: 'text-right',
      total: true,
    },
    {
      path: 'payable',
      label: 'Payable',
      pipe: 'currencyBd',
      className: 'text-right',
      total: true,
    },
  ];

  sortColumn = { path: 'createdAt', order: 'desc' };

  constructor() {
  }
}
