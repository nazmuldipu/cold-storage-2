import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'dash-nav',
  templateUrl: './dash-nav.component.html',
  styleUrls: ['./dash-nav.component.scss'],
})
export class DashNavComponent implements OnInit {
  show = false;
  user;
  nav_data = [
    {
      name: 'Dashboard',
      link: '/dashboard',
      icon: 'fa-home',
      subnav: [],
    },

    {
      name: 'Inventory Setting',
      icon: 'fa-home',
      subnav: [
        {
          name: 'Add Chamber',
          icon: 'fa-plus',
          link: '/dashboard/chamber',
        },
        {
          name: 'Add Floor',
          icon: 'fa-plus',
          link: '/dashboard/floor',
        },
        {
          name: 'Add Line',
          icon: 'fa-plus',
          link: '/dashboard/line',
        },
        {
          name: 'Add Pocket',
          icon: 'fa-plus',
          link: '/dashboard/pocket',
        }
      ],
    },
    {
      name: 'Inventory',
      icon: 'fa-cubes',
      subnav: [
        {
          name: 'Agent',
          icon: 'fa-plus',
          link: '/dashboard/agent',
        },
        {
          name: 'Loading Party',
          icon: 'fa-plus',
          link: '/dashboard/customer',
        },
        {
          name: 'Inventory',
          icon: 'fa-plus',
          link: '/dashboard/inventory',
        },
        {
          name: 'Palloting',
          icon: 'fa-plus',
          link: '/dashboard/pallot',
        }
      ],
    },
    {
      name: 'Inventory Report',
      icon: 'fa-cubes',
      subnav: [
        {
          name: 'Inventory list',
          icon: 'fa-plus',
          link: '/dashboard/inventory-list',
        },
        {
          name: 'Inventory report',
          icon: 'fa-plus',
          link: '/dashboard/inventory-report',
        }
      ],
    },
    {
      name: 'Ledger',
      icon: 'fa-archive',
      link: '/dashboard/ledger-add',
      subnav: [],
    },
    {
      name: 'Delivery',
      icon: 'fa-archive',
      link: '/dashboard/delivery',
      subnav: [],
    },
    {
      name: 'General Setting',
      icon: 'fa-cog',
      subnav: [
        { name: 'User', icon: 'fa-user', link: '/dashboard/user' },
        { name: 'Role', icon: 'fa-shopping-bag', link: '/dashboard/role' },
        // { name: 'Company', icon: 'fa-building', link: '/dashboard/company' },
      ],
    },
    // {
    //   name: 'Accessories',
    //   link: '/dashboard/categories/add',
    //   icon: 'fa-sign-language ',
    //   subnav: [],
    // },
    // {
    //   name: 'Test',
    //   link: '/dashboard/test',
    //   icon: 'fa-home',
    //   subnav: [],
    // },
  ];

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe((data) => {
      if (data) {
        this.user = { _id: data.uid, email: data.email };
      } else {
        this.user = null;
      }
    });
  }

  toggleCollapse() {
    this.show = !this.show;
  }

  isAuthenticated() {
    return !!this.user;
  }

  logout() {
    this.auth.logout();
  }
}
