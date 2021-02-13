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
  chamberList: Chamber[];
  floorList: Floor[];
  lineList: Line[];
  pocketList: Pocket[];
  pocket: Pocket;

  tableName = 'Pocket Table';
  columns = [
    { path: '#', label: '#', className: 'font-weight-bold' },
    {
      path: 'chamber.name',
      label: 'Chamber',
    },
    {
      path: 'floor.name',
      label: 'Floor',
    },
    {
      path: 'line.name',
      label: 'Line',
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
      content: (pocket) => {
        return {
          classname: 'edit_link',
          text: 'Edit',
          event: { key: 'edit', id: pocket._id },
        };
      },
    },
  ];
  sortColumn = { path: 'name', order: 'asc' };

  errorMessage = '';

  constructor(
    private chamberService: ChamberService,
    private floorService: FloorService,
    private lineService: LineService,
    private pocketService: PocketService,
    private util: UtilService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getChamberList();
    this.getPocketList();
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
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
    this.lineService.lines$.subscribe((data) => {
      this.lineList = data.filter((ln) => ln.floor._id == floorId);
      this.lineList.sort(this.util.dynamicSortObject('priority'));
    });
  }

  async getPocketList() {
    this.pocketService.pockets$.subscribe((data) => {
      this.pocketList = data;
      this.pocketList.sort(this.util.dynamicSortObject('priority'));
    });
  }
  
  async onCreate(event: Pocket) {
    this.sendingData = true;
    const value = {
      ...event,
      slug: this.util.string_to_slug(event.name),
    } as Pocket;
    
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

  async onDelete(id) {
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

  buttonEvent(event) {
    switch (event['key']) {
      case 'edit':
        this.pocket = this.pocketList.find((ln) => ln._id === event['id']);
        break;
    }
  }

  clear() {
    this.pocket = null;
    this.errorMessage = '';
    this.sendingData = false;
  }
}
