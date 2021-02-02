import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Loan } from 'src/shared/model/loan.model';

@Component({
  selector: 'loan-table',
  templateUrl: './loan-table.component.html',
  styleUrls: ['./loan-table.component.scss'],
})
export class LoanTableComponent implements OnChanges {
  @Input() loanList: Loan[];
  total;

  constructor() {
    this.total = { amount: 0, profit: 0, payable: 0 };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loanList && this.loanList.length > 0) {
      this.calculateTotal();
    }
  }
  calculateTotal() {
    this.total = { amount: 0, profit: 0, payable: 0 };
    this.loanList.forEach((loan) => {
      this.total.amount += loan.amount;
      this.total.profit += loan.profit;
      this.total.payable +=  loan.payable;
    });
  }
}
