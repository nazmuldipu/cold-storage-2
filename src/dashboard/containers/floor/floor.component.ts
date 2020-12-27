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
  loadingData = false;
  chamberList: Chamber[] = [];
  floorList: Floor[] = [];
  floor: Floor;

  page = 1;
  pageSize = 8;
  floorPage: Floor[] = [];
  errorMessage = '';

  cols: any[];

  constructor(
    private floorService: FloorService,
    private chamberService: ChamberService,
    private util: UtilService
  ) { }

  ngOnInit(): void {
    this.getChamberList();
    this.getFloorList();

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'capacity', header: 'Capacity' },
      { field: 'priority', header: 'Priority' },
    ];
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
      this.refreshFloor();
    });
  }

  refreshFloor() {
    this.floorPage = this.floorList
      .map((floor, i) => ({ id: i + 1, ...floor }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
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

  onEdit(id) {
    this.floor = this.floorList.find((cp) => cp._id === id);
  }

  clear() {
    this.floor = null;
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }
}
