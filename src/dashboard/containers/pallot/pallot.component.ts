import { Component, OnInit, AfterViewChecked, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { Pallot } from 'src/shared/model/pallot.model';
import { PallotService } from 'src/service/pallot.service';
import { UtilService } from 'src/service/util.service';
import { Chamber } from 'src/shared/model/chamber.model';
import { Floor } from 'src/shared/model/floor.model';
import { Line } from 'src/shared/model/line.model';
import { ChamberService } from 'src/service/chamber.service';
import { FloorService } from 'src/service/floor.service';
import { LineService } from 'src/service/line.service';
import { PocketService } from 'src/service/pocket.service';
import { Pocket } from 'src/shared/model/pocket.model';

@Component({
  selector: 'app-pallot',
  templateUrl: './pallot.component.html',
  styleUrls: ['./pallot.component.scss']
})
export class PallotComponent implements OnInit, AfterContentChecked, AfterViewChecked {
  sendingData = false;
  loadingData = false;
  chamberList: Chamber[];
  floorList: Floor[];
  lineList: Line[];
  pocketList: Pocket[];
  pallotList: Pallot[];
  pallot: Pallot;

  errorMessage = '';

  constructor(
    private chamberService: ChamberService,
    private floorService: FloorService,
    private lineService: LineService,
    private pallotService: PallotService,
    private pocketService: PocketService,
    private util: UtilService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getChamberList();
    this.getPallotList();
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
      this.chamberList.sort(this.util.dynamicSortObject('name'));
    });
  }

  async getFloorList(chamberId) {
    this.floorService.floors$.subscribe((data) => {
      this.floorList = data.filter((fl) => fl.chamber._id == chamberId);
      this.floorList.sort(this.util.dynamicSortObject('name'));
    });
  }

  async getLineList(floorId) {
    console.log(floorId);
    this.lineService.lines$.subscribe((data) => {
      this.lineList = data.filter((ln) => ln.floor._id == floorId);
      console.log(this.lineList);
      this.lineList.sort(this.util.dynamicSortObject('name'));
    });
  }

  async getPocketList(lineId) {
    this.pocketService.pockets$.subscribe(data => {
      this.pocketList = data.filter(p => p.line._id == lineId);
      this.lineList.sort(this.util.dynamicSortObject('name'))
    })
  }

  async getPallotList() {
    this.pallotService.pallots$.subscribe((data) => {
      this.pallotList = data;
      this.pallotList.sort(this.util.dynamicSortObject('priority'));
    });
  }

  async onCreate(event: Pallot) {
    this.sendingData = true;
    const value = {
      ...event,
    } as Pallot;
    console.log(value);
    await this.pallotService
      .create(value)
      .then((ref) => {
        console.log(ref);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
  async onUpdate(event: Pallot) {
    this.sendingData = true;
    const value = {
      ...event,
      createdAt: this.pallot.createdAt,
    } as Pallot;
    await this.pallotService
      .update(this.pallot._id, value)
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
      await this.pallotService
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
    this.pallot = this.pallotList.find((ln) => ln._id === id);
  }

  clear() {
    this.pallot = null;
    this.errorMessage = '';
    this.sendingData = false;
    this.loadingData = false;
  }
}
