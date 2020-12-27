import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cold-storage-v2';
}
