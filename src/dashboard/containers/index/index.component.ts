import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  user;
  quickLinks: QuickLinks[];

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.quickLinks = [
      { name: 'Loading Registration', url: '/dashboard/add-loading' },
      { name: 'Loading List', url: '/dashboard/loading' },
    ];

    this.auth.user$.subscribe(data => {
      if (data) {
        this.user = { _id: data.uid, email: data.email };
      } else {
        this.user = null;
      }
    })
  }

  isAuthenticated() {
    return !!this.user;
  }

  onLinkClick(event) {
    console.log(event.value);
    this.router.navigate([event.value.url]);
  }
}

interface QuickLinks {
  name: string,
  url: string
}
