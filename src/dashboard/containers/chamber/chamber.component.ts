import { Component, OnInit } from '@angular/core';
import { ChamberService } from 'src/service/chamber.service';
import { UtilService } from 'src/service/util.service';
import { Chamber } from 'src/shared/model/chamber.model';

@Component({
  selector: 'app-chamber',
  templateUrl: './chamber.component.html',
  styleUrls: ['./chamber.component.scss'],
})
export class ChamberComponent implements OnInit {
  sendingData = false;

  chamberList: Chamber[] = [];
  chamber: Chamber;
  errorMessage = '';

  tableName = 'Floor Table';
  columns = [
    { path: '#', label: '#', className: 'font-weight-bold' },
    {
      path: 'name',
      label: 'Name',
      searchable: true,
      totalLabel: true,
    },
    {
      path: 'capacity',
      label: 'Capacity',
      total: true,
      pipe: 'currencyBd',
      className: 'text-right',
    },
    {
      key: '_id',
      type: 'button',
      content: (chamber) => {
        return {
          classname: 'edit_link',
          text: 'Edit',
          event: { key: 'edit', id: chamber._id },
        };
      },
    },
  ];
  sortColumn = { path: 'name', order: 'asc' };

  constructor(
    private chamberService: ChamberService,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.getChamberList();
  }

  async getChamberList() {
    this.chamberService.chambers$.subscribe((data) => {
      this.chamberList = data;
      this.chamberList.sort(this.util.dynamicSortObject('name'));
    });
  }

  async onCreate(event: Chamber) {
    this.sendingData = true;
    const value = { ...event, slug: event.name.toLowerCase() };
    await this.chamberService
      .create(value)
      .then((ref) => {
        console.log(ref);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  async onUpdate(event: Chamber) {
    this.sendingData = true;
    const value = {
      ...event,
      slug: this.util.string_to_slug(event.name),
      createdAt: this.chamber.createdAt,
    };
    await this.chamberService
      .update(this.chamber._id, value)
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
      await this.chamberService
        .delete(id)
        .then(() => {
          this.sendingData = false;
          this.chamber = null;
        })
        .catch((error) => {
          this.sendingData = false;
          (this.errorMessage = 'Chamber Deleting ERROR ! '), error;
        });
      this.clear();
    }
  }

  buttonEvent(event) {
    switch (event['key']) {
      case 'edit':
        this.chamber = this.chamberList.find((cp) => cp._id === event['id']);
        console.log(this.chamber);
        break;
    }
  }

  clear() {
    this.chamber = null;
    this.errorMessage = '';
    this.sendingData = false;
  }
}
