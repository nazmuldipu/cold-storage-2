import { Component, OnInit } from '@angular/core';
import { Loan } from 'src/shared/model/loan.model';
import { LoanService } from 'src/service/loan.service';
import { UtilService } from 'src/service/util.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  sendingData = false;
  loadingData = false;
  loanList: Loan[] = [];
  loan: Loan;

  page = 1;
  pageSize = 8;
  loanPage: Loan[] = [];
  errorMessage = '';

  constructor(private loanService: LoanService, private util: UtilService) { }

  ngOnInit(): void {
    this.getLoanList();
  }

  async getLoanList() {
    this.loanService.loans$.subscribe((data) => {
      this.loanList = data;
      this.loanList.sort(this.util.dynamicSortObject('sr_no'));
      this.refreshLoan();
    });
  }

  refreshLoan() {
    this.loanPage = this.loanList
      .map((chamber, i) => ({ id: i + 1, ...chamber }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  async onCreate(event: Loan) {
    this.sendingData = true;
    const value = {
      ...event,
    } as Loan;
    await this.loanService
      .create(value)
      .then((ref) => {
        console.log(ref);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
  async onUpdate(event: Loan) {
    this.sendingData = true;
    const value = {
      ...event,
      createdAt: this.loan.createdAt,
    };
    await this.loanService
      .update(this.loan._id, value)
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
      await this.loanService
        .delete(id)
        .then(() => {
          this.sendingData = false;
        })
        .catch((error) => {
          this.sendingData = false;
          (this.errorMessage = 'Loan Deleting ERROR ! '), error;
        });
      this.clear();
    }
  }

  onEdit(id) {
    this.loan = this.loanList.find((cp) => cp._id === id);
  }

  clear() {
    this.loan = null;
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }
}
