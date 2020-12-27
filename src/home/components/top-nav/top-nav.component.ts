import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  show = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleCollapse() {
    this.show = !this.show;
  }

}
