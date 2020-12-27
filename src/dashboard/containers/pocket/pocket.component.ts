import { AfterContentChecked, AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChamberService } from 'src/service/chamber.service';
import { FloorService } from 'src/service/floor.service';
import { LineService } from 'src/service/line.service';
import { PocketService } from 'src/service/pocket.service';
import { UtilService } from 'src/service/util.service';
import { Chamber } from 'src/shared/model/chamber.model';
import { Floor } from 'src/shared/model/floor.model';
import { Line } from 'src/shared/model/line.model';
import { Pocket } from 'src/shared/model/pocket.model';

@Component({
  selector: 'app-pocket',
  templateUrl: './pocket.component.html',
  styleUrls: ['./pocket.component.scss'],
})
export class PocketComponent
  implements OnInit, AfterContentChecked, AfterViewChecked {
  sendingData = false;
  loadingData = false;
  chamberList: Chamber[];
  floorList: Floor[];
  lineList: Line[];
  pocketList: Pocket[];
  pocket: Pocket;

  page = 1;
  pageSize = 8;
  pocketPage: Pocket[] = [];
  errorMessage = '';
  cols: any[];

  constructor(
    private chamberService: ChamberService,
    private floorService: FloorService,
    private lineService: LineService,
    private pocketService: PocketService,
    private util: UtilService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getChamberList();
    this.getPocketList();

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'capacity', header: 'Capacity' },
      { field: 'priority', header: 'Priority' },
    ];
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
    // console.log(this.cdr.detectChanges())
  }
  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }
  async getChamberList() {
    this.chamberService.chambers$.subscribe((data) => {
      this.chamberList = data;
      this.chamberList.sort(this.util.dynamicSortObject('priority'));
    });
  }

  async getFloorList(chamberId) {
    this.floorService.floors$.subscribe((data) => {
      this.floorList = data.filter((fl) => fl.chamber._id == chamberId);
      this.floorList.sort(this.util.dynamicSortObject('priority'));
    });
  }

  async getLineList(floorId) {
    console.log(floorId);
    this.lineService.lines$.subscribe((data) => {
      this.lineList = data.filter((ln) => ln.floor._id == floorId);
      console.log(this.lineList);
      this.lineList.sort(this.util.dynamicSortObject('priority'));
    });
  }

  async getPocketList() {
    this.pocketService.pockets$.subscribe((data) => {
      this.pocketList = data;
      this.pocketList.sort(this.util.dynamicSortObject('priority'));
      this.refreshPocket();
    });
  }
  refreshPocket() {
    this.pocketPage = this.pocketList
      .map((pocket, i) => ({ id: i + 1, ...pocket }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  async onCreate(event: Pocket) {
    this.sendingData = true;
    const value = {
      ...event,
      slug: this.util.string_to_slug(event.name),
    } as Pocket;
    console.log(value);
    await this.pocketService
      .create(value)
      .then((ref) => {
        console.log(ref);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
  async onUpdate(event: Pocket) {
    this.sendingData = true;
    const value = {
      ...event,
      slug: event.name.toLowerCase(),
      createdAt: this.pocket.createdAt,
    } as Pocket;
    await this.pocketService
      .update(this.pocket._id, value)
      .then(() => {
        this.sendingData = false;
      })
      .catch((error) => {
        this.sendingData = false;
        (this.errorMessage = 'Group Updating ERROR ! '), error;
      });
    this.clear();
  }

  async delete(id) {
    this.sendingData = true;
    if (confirm('Are you sure to delete')) {
      await this.pocketService
        .delete(id)
        .then(() => {
          this.sendingData = false;
        })
        .catch((error) => {
          this.sendingData = false;
          (this.errorMessage = 'Line Deleting ERROR ! '), error;
        });
      this.clear();
    }
  }

  onEdit(id) {
    this.pocket = this.pocketList.find((ln) => ln._id === id);
  }

  clear() {
    this.pocket = null;
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }
}
