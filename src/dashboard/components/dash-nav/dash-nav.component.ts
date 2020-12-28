import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'dash-nav',
  templateUrl: './dash-nav.component.html',
  styleUrls: ['./dash-nav.component.scss']
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
        },
        // {
        //   name: 'Add Position',
        //   icon: 'fa-plus',
        //   link: '/dashboard/position',
        // },
        // {
        //   name: 'Add Chamber Type',
        //   icon: 'fa-plus',
        //   link: '/dashboard/chamber-type',
        // },
      ],
    },
    {
      name: 'Loading',
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
          name: 'Loading Registration',
          icon: 'fa-plus',
          link: '/dashboard/add-loading',
        },
        {
          name: 'Loading List',
          icon: 'fa-plus',
          link: '/dashboard/loading',
        },
      ],
    },
    {
      name: 'Loading Report',
      icon: 'fa-cubes',
      subnav: [
        {
          name: 'Daily Load',
          icon: 'fa-plus',
          link: '/dashboard/products/brands',
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
    {
      name: 'Chembering',
      icon: 'fa-archive',
      subnav: [
        { name: 'Brands', icon: 'fa-tags', link: '/dashboard/products/brands' },
        {
          name: 'Shops',
          icon: 'fa-shopping-bag',
          link: '/dashboard/products/shops',
        },
      ],
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
      subCagegories: [],
    },
  ];

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
    return !!this.user;
  }

  logout() {
    this.auth.logout()
  }
}
