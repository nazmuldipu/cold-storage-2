import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { RoleService } from 'src/service/role.service';
import { UserService } from 'src/service/user.service';
import { UtilService } from 'src/service/util.service';
import { Role } from 'src/shared/model/role.model';
import { User, UserPage } from 'src/shared/model/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  sendingData = false;
  loadingData = false;
  // userList: User[] = [];
  userPage: UserPage;
  roleList: Role[] = [];
  user: User;
  page = 1;
  pageSize = 8;
  // userPage: User[] = [];
  errorMessage = '';

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private auth: AuthService,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.getUserList();
    this.getRoleList();
  }

  async getRoleList() {
    this.roleService.roles$.subscribe((data) => {
      this.roleList = data;
      this.roleList.sort(this.util.dynamicSortObject('name'));
    });
  }

  async getUserList(
    page: number = 1,
    limit: number = 8,
    sort: string = 'name',
    order: string = 'asc'
  ) {
    console.log(page, limit, sort, order);
    try {
      this.loadingData = true;
      this.userPage = await this.userService
        .getUserList(page, limit, sort, order)
        .toPromise();
      this.loadingData = false;
    } catch (error) {}
    // this.userService.users$.subscribe((data) => {
    //   this.userList = data;
    //   this.userList.sort(this.util.dynamicSortObject('name'));
    //   this.refreshUser();
    // });
  }
  refreshData({ page, limit, sort, order }) {
    this.getUserList(page, limit, sort, order);
  }

  // refreshUser() {
  //   this.userPage = this.userList
  //     .map((user, i) => ({ id: i + 1, ...user }))
  //     .slice(
  //       (this.page - 1) * this.pageSize,
  //       (this.page - 1) * this.pageSize + this.pageSize
  //     );
  //   console.log(this.userPage);
  // }

  async onCreate(event: User) {
    this.sendingData = true;
    const value = { ...event, slug: event.name.toLowerCase() };
    await this.userService
      .create(value)
      .then((ref) => {
        console.log(ref);
        this.auth
          .register(event.email, event.password)
          .then((ref) => console.log('User Registration success'));
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
  async onUpdate(event: User) {
    this.sendingData = true;
    const value = {
      ...event,
      slug: this.util.string_to_slug(event.name),
      createdAt: this.user.createdAt,
    };
    await this.userService
      .update(this.user._id, value)
      .then(() => {
        this.sendingData = false;
      })
      .catch((error) => {
        this.sendingData = false;
        (this.errorMessage = 'Group Updating ERROR ! '), error;
      });
    this.clear();
  }

  async onDelete(id) {
    this.sendingData = true;
    if (confirm('Are you sure to delete')) {
      await this.userService
        .delete(id)
        .then(() => {
          this.sendingData = false;
          this.user = null;
        })
        .catch((error) => {
          this.sendingData = false;
          (this.errorMessage = 'User Deleting ERROR ! '), error;
        });
      this.clear();
    }
  }

  // onEdit(id) {
  //   this.user = this.userList.find((cp) => cp._id === id);
  //   console.log('onEdit', id);
  // }

  clear() {
    this.user = null;
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }
}
