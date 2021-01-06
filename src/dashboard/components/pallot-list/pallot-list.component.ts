import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pallot } from 'src/shared/model/pallot.model';

@Component({
  selector: 'pallot-list',
  templateUrl: './pallot-list.component.html',
  styleUrls: ['./pallot-list.component.scss']
})
export class PallotListComponent implements OnChanges {
  @Input() pallotList: Pallot[];

  page = 1;
  pageSize = 8;
  pallotPage: Pallot[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pallotList && this.pallotList != null) {
      this.refreshPallot();
    }
  }

  refreshPallot() {
    this.pallotPage = this.pallotList
      .map((pallot, i) => ({ id: i + 1, ...pallot }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  onSearch(event) {
    if (event.length >= 2) {
      this.pallotPage = this.search(event);
    } else {
      this.refreshPallot();
    }
  }

  search(text: string): Pallot[] {
    return this.pallotList.filter((loading) => {
      const term = text.toLowerCase();
      return (
        loading.sr_no.toLowerCase().includes(term)
      );
    });
  }
}
