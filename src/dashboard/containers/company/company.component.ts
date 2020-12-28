import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/service/company.service';
import { UtilService } from 'src/service/util.service';
import { Company } from 'src/shared/model/company.model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  sendingData = false;
  loadingData = false;
  companyList: Company[] = [];
  company: Company;
  errorMessage = '';

  constructor(
    private companyService: CompanyService,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.getCompanyList();
  }

  async getCompanyList() {
    this.companyService.companys$.subscribe((data) => {
      this.companyList = data;
      this.companyList.sort(this.util.dynamicSortObject('name'));
      if (this.companyList.length > 0) this.company = this.companyList[0];
    });
  }

  async onCreate(event: Company) {
    this.sendingData = true;
    const value = { ...event, slug: event.name.toLowerCase() };
    await this.companyService
      .create(value)
      .then((ref) => {
        console.log(ref);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
  async onUpdate(event: Company) {
    this.sendingData = true;
    const value = {
      ...event,
      slug: this.util.string_to_slug(event.name),
      createdAt: this.company.createdAt,
    };
    await this.companyService
      .update(this.company._id, value)
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
      await this.companyService
        .delete(id)
        .then(() => {
          this.sendingData = false;
          this.company = null;
        })
        .catch((error) => {
          this.sendingData = false;
          (this.errorMessage = 'Company Deleting ERROR ! '), error;
        });
      this.clear();
    }
  }

  onEdit(id) {
    this.company = this.companyList.find((cp) => cp._id === id);
    console.log('onEdit', id);
  }

  clear() {
    this.company = null;
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }
}
