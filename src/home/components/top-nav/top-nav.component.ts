import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  show = false;
  user;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(data => {
      if (data) {
        this.user = { _id: data.uid, email: data.email };
      } else {
        this.user = null;
      }
    })
  }

  toggleCollapse() {
    this.show = !this.show;
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  logout() {
    this.auth.logout()
  }

}
