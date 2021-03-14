import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() short: boolean = false;
  @Input() collectionSize:number = 1;
  @Input() pageSize: number = 1;
  @Input() page:number = 1;
  @Output() pageChange = new EventEmitter<number>();
  
  pageCount = 1;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.pageCount = Math.ceil(this.collectionSize / this.pageSize);
  }

  

  onPaginate(page: number) {
    this.pageChange.emit(page);
  }

  counter(currentPage: number, totalPages: number) {
    let startPage = 1;
    let length = 10;
    if (totalPages < 10) {
      length = totalPages;
    } else {
      if (currentPage < 5) {
        startPage = 1;
      } else if (currentPage + 5 >= totalPages) {
        startPage = totalPages - 9;
      } else {
        startPage = currentPage - 4;
      }
    }
    return Array.from({ length: length }, (v, k) => k + startPage);
  }

}
