import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { LoadingService } from 'src/service/loading.service';
import { UtilService } from 'src/service/util.service';
import { Loading } from 'src/shared/model/loading.model';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  providers: [DecimalPipe],
})
export class LoadingComponent implements OnInit {
  loadingList: Loading[];
  loading: Loading;

  loadingDialog = false;
  loadingData = false;

  searching = false;
  page = 1;
  pageSize = 8;
  loadingPage: Loading[] = [];
  loadingSearch: Loading[] = [];
  errorMessage = '';

  constructor(
    private loadingService: LoadingService,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.getLoadingList();
  }

  async getLoadingList() {
    this.loadingService.loadings$.subscribe((data) => {
      this.loadingList = data;
      this.loadingList.sort(this.util.dynamicSortObject('priority'));
      this.refreshLoading();
    });
  }

  refreshLoading() {
    this.loadingPage = this.loadingList
      .map((loading, i) => ({ id: i + 1, ...loading }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  onSearch(event) {
    if (event.length > 2) {
      this.searching = true;
      console.log(event, event.length);
      this.loadingSearch = this.search(event);
      console.log(this.loadingSearch);
    } else {
      this.searching = false;
    }
  }

  search(text: string): Loading[] {
    return this.loadingList.filter((loading) => {
      const term = text.toLowerCase();
      return (
        loading.s_r_no.toString().includes(term) ||
        loading.agent.name.toLowerCase().includes(term) ||
        loading.agent.phone.includes(term) ||
        loading.customer.name.toLowerCase().includes(term) ||
        loading.customer.phone.includes(term)
      );
    });
  }

  onDetails(id) {
    console.log('onDetails', id);
    this.loading = this.loadingList.find((ld) => ld._id == id);
  }
}
