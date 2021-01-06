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
      name: ' Report',
      icon: 'fa-cubes',
      subnav: [
        {
          name: 'Inventory report',
          icon: 'fa-plus',
          link: '/dashboard/inventory-report',
        },
        {
          name: 'SR to SR laod',
          icon: 'fa-plus',
          link: '/dashboard/products/brands',
        },
        {
          name: 'Loading Summary',
          icon: 'fa-plus',
          link: '/dashboard/products/brands',
        },
        {
          name: 'All Loading',
          icon: 'fa-plus',
          link: '/dashboard/products/brands',
        },
        {
          name: 'Party Ledger',
          icon: 'fa-plus',
          link: '/dashboard/products/brands',
        },
        {
          name: 'ALl Loding Party',
          icon: 'fa-plus',
          link: '/dashboard/products/brands',
        },
      ],
    },
    // {
    //   name: 'Loan',
    //   icon: 'fa-archive',
    //   link: '/dashboard/loan',
    //   subnav: [],
    // },
    {
      name: 'Ledger',
      icon: 'fa-archive',
      link: '/dashboard/ledger-add',
      subnav: [
        // { name: 'Add Ledger', icon: 'fa-shopping-bag', link: '/dashboard/ledger-add', },
        // { name: 'Ledger list', icon: 'fa-tags', link: '/dashboard/ledger' },
      ],
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
        { name: 'Company', icon: 'fa-building', link: '/dashboard/company' },
      ],
    },
    {
      name: 'Accessories',
      link: '/dashboard/categories/add',
      icon: 'fa-sign-language ',
      subnav: [],
    },
    {
      name: 'Test',
      link: '/dashboard/test',
      icon: 'fa-home',
      subnav: [],
    },
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
