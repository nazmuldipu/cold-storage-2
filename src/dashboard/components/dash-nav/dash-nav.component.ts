import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { UserService } from 'src/service/user.service';

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
      name: 'ড্যাশবোর্ড',
      link: '/dashboard',
      icon: 'fa-home',
      subnav: [],
    },

    {
      name: 'ইনভেন্টরি সেটিং',
      icon: 'fa-home',
      subnav: [
        {
          name: 'চেম্বার',
          icon: 'fa-plus',
          link: '/dashboard/chamber',
        },
        {
          name: 'ফ্লোর',
          icon: 'fa-plus',
          link: '/dashboard/floor',
        },
        {
          name: 'লাইন',
          icon: 'fa-plus',
          link: '/dashboard/line',
        },
        {
          name: 'পকেট',
          icon: 'fa-plus',
          link: '/dashboard/pocket',
        },
      ],
    },
    {
      name: 'ইনভেন্টরি',
      icon: 'fa-cubes',
      subnav: [
        {
          name: 'এজেন্ট ',
          icon: 'fa-plus',
          link: '/dashboard/agent',
        },
        {
          name: 'লোডিং পার্টি',
          icon: 'fa-plus',
          link: '/dashboard/customer',
        },
        {
          name: 'ইনভেন্টরি',
          icon: 'fa-plus',
          link: '/dashboard/inventory',
        },
        {
          name: 'প্যালটিং',
          icon: 'fa-plus',
          link: '/dashboard/pallot',
        },
      ],
    },
    {
      name: 'ইনভেন্টরি রিপোর্ট',
      icon: 'fa-cubes',
      subnav: [
        {
          name: 'ইনভেন্টরি তালিকা',
          icon: 'fa-plus',
          link: '/dashboard/inventory-list',
        },
        {
          name: 'ইনভেন্টরি রিপোর্ট',
          icon: 'fa-plus',
          link: '/dashboard/report/inventory-report',
        },
      ],
    },
    {
      name: 'লেজার',
      icon: 'fa-archive',
      link: '/dashboard/ledger-add',
      subnav: [],
    },
    {
      name: 'ডেলিভারি',
      icon: 'fa-archive',
      link: '/dashboard/delivery',
      subnav: [],
    },
    {
      name: 'রিপোর্ট',
      icon: 'fa-cubes',
      subnav: [
        {
          name: 'লেজার রিপোর্ট',
          icon: 'fa-plus',
          link: '/dashboard/report/ledger-report',
        },
        {
          name: 'লোন রিপোর্ট',
          icon: 'fa-plus',
          link: '/dashboard/report/loan-report',
        },
        {
          name: 'প্রোডাক্ট রিপোর্ট',
          icon: 'fa-plus',
          link: '/dashboard/report/product-report',
        },
        {
          name: 'ডেলিভারি রিপোর্ট তারিখ অনুসারে',
          icon: 'fa-plus',
          link: '/dashboard/report/delivery-report-date',
        },
        {
          name: 'ডেলিভারি রিপোর্ট লট নং অনুসারে',
          icon: 'fa-plus',
          link: '/dashboard/report/delivery-report-sr',
        },
      ],
    },
    {
      name: 'জেনারেল সেটিং',
      icon: 'fa-cog',
      subnav: [
        { name: 'ইউজার', icon: 'fa-user', link: '/dashboard/user' },
        { name: 'রোল', icon: 'fa-shopping-bag', link: '/dashboard/role' },
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

  constructor(private auth: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((data) => {
      const { _id, email, name } = data;
      this.user = { _id, email, name };
    });
  }

  toggleCollapse() {
    this.show = !this.show;
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  logout() {
    this.auth.logout();
  }
}
