import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { RoleService } from 'src/service/role.service';
import { UserService } from 'src/service/user.service';
import { UtilService } from 'src/service/util.service';
import { Role } from 'src/shared/model/role.model';
import { User, UserPage } from 'src/shared/model/user.model';
import { RoleList } from './../../../shared/data/role-list.data';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  sendingData = false;
  loadingData = false;
  userPage: UserPage;
  roleList: Role[] = RoleList;
  user: User;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  async getUserList(
    page: number = 1,
    limit: number = 8,
    sort: string = 'name',
    order: string = 'asc',
    param: string = ''
  ) {
    try {
      this.loadingData = true;
      this.userPage = await this.userService
        .getUserList(page, limit, sort, order, param)
        .toPromise();
      this.loadingData = false;
    } catch (error) {}
  }

  refreshData({ page, limit, sort, order, search }) {
    this.getUserList(page, limit, sort, order, search);
  }

  async onCreate(event: User) {
    try {
      this.sendingData = true;
      const resp = await this.userService.userRegistration(event).toPromise();
      this.sendingData = false;
    } catch (error) {
      this.errorMessage = error;
    }
  }

  async onUpdate(event: User) {
    try {
      this.sendingData = true;
      await this.userService.update(this.user._id, event).toPromise();
      this.sendingData = false;
    } catch (err) {
      this.errorMessage = err;
    }
  }

  async onDelete(id) {
    if (confirm('Are you sure to delete')) {
      try {
        this.sendingData = true;
        const resp = await this.userService.delete(id).toPromise();
        console.log(resp);
        this.sendingData = false;
        this.clear();
      } catch (err) {
        this.errorMessage = err;
      }
    }
  }

  onEdit(id) {
    this.user = this.userPage.docs.find((cp) => cp._id === id);
    console.log('onEdit', id, this.user);
  }

  clear() {
    this.user = null;
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }
}
