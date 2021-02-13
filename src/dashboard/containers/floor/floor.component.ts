import { Component, OnInit } from '@angular/core';
import { ChamberService } from 'src/service/chamber.service';
import { FloorService } from 'src/service/floor.service';
import { UtilService } from 'src/service/util.service';
import { Chamber } from 'src/shared/model/chamber.model';
import { Floor } from 'src/shared/model/floor.model';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss'],
})
export class FloorComponent implements OnInit {
  sendingData = false;
  chamberList: Chamber[] = [];
  floorList: Floor[] = [];
  floor: Floor;

  errorMessage = '';
  tableName = 'Chamber Table';
  columns = [
    { path: '#', label: '#', className: 'font-weight-bold' },
    {
      path: 'chamber.name',
      label: 'Chamber',
    },
    {
      path: 'name',
      label: 'Name',
      searchable: true,
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
    private floorService: FloorService,
    private chamberService: ChamberService,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.getChamberList();
    this.getFloorList();
  }

  async getChamberList() {
    this.chamberService.chambers$.subscribe((data) => {
      this.chamberList = data;
      this.chamberList.sort(this.util.dynamicSortObject('name'));
    });
  }

  async getFloorList() {
    this.floorService.floors$.subscribe((data) => {
      this.floorList = data;
      this.floorList.sort(this.util.dynamicSortObject('chamber.name'));
    });
  }

  async onCreate(event: Floor) {
    this.sendingData = true;
    const value = {
      ...event,
      slug: this.util.string_to_slug(event.name),
    } as Floor;
    await this.floorService
      .create(value)
      .then((ref) => {
        console.log(ref);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  async onUpdate(event: Floor) {
    this.sendingData = true;
    const value = {
      ...event,
      slug: event.name.toLowerCase(),
      createdAt: this.floor.createdAt,
    };
    await this.floorService
      .update(this.floor._id, value)
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
      await this.floorService
        .delete(id)
        .then(() => {
          this.sendingData = false;
        })
        .catch((error) => {
          this.sendingData = false;
          (this.errorMessage = 'Floor Deleting ERROR ! '), error;
        });
      this.clear();
    }
  }

  buttonEvent(event) {
    switch (event['key']) {
      case 'edit':
        this.floor = this.floorList.find((fl) => fl._id === event['id']);
        console.log(this.floor);
        break;
    }
  }

  clear() {
    this.floor = null;
    this.errorMessage = '';
    this.sendingData = false;
  }
}
