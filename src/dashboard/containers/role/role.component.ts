import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/service/role.service';
import { UtilService } from 'src/service/util.service';
import { Role } from 'src/shared/model/role.model';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  sendingData = false;
  loadingData = false;
  roleList: Role[] = [];
  role: Role;

  page = 1;
  pageSize = 8;
  rolePage: Role[] = [];
  errorMessage = '';

  
  constructor(private roleService: RoleService, private util: UtilService) {}

  ngOnInit(): void {
    this.getRoleList();

  }

  async getRoleList() {
    this.roleService.roles$.subscribe((data) => {
      this.roleList = data;
      this.roleList.sort(this.util.dynamicSortObject('name'));
      this.refreshRole();
    });
  }

  refreshRole() {
    this.rolePage = this.roleList
      .map((role, i) => ({ id: i + 1, ...role }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  async onCreate(event: Role) {
    // this.sendingData = true;
    // const value = { ...event, slug: event.name.toLowerCase() };
    // await this.roleService
    //   .create(value)
    //   .then((ref) => {
    //     console.log(ref);
    //   })
    //   .catch((error) => {
    //     console.log('error', error);
    //   });
  }

  async onUpdate(event: Role) {
    this.sendingData = true;
    const value = {
      ...event,
      slug: this.util.string_to_slug(event.name),
      createdAt: this.role.createdAt,
    };
    await this.roleService
      .update(this.role._id, value)
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
      await this.roleService
        .delete(id)
        .then(() => {
          this.sendingData = false;
          this.role = null;
        })
        .catch((error) => {
          this.sendingData = false;
          (this.errorMessage = 'Role Deleting ERROR ! '), error;
        });
      this.clear();
    }
  }

  onEdit(id) {
    this.role = this.roleList.find((cp) => cp._id === id);
    console.log('onEdit', id);
  }

  clear() {
    this.role = null;
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }
}
