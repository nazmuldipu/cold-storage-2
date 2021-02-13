import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChamberService } from 'src/service/chamber.service';
import { FloorService } from 'src/service/floor.service';
import { LineService } from 'src/service/line.service';
import { UtilService } from 'src/service/util.service';
import { Chamber } from 'src/shared/model/chamber.model';
import { Floor } from 'src/shared/model/floor.model';
import { Line } from 'src/shared/model/line.model';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
})
export class LineComponent implements OnInit, AfterContentChecked {
  sendingData = false;
  chamberList: Chamber[];
  floorList: Floor[];
  lineList: Line[];
  line: Line;

  tableName = 'Line Table';
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
      content: (line) => {
        return {
          classname: 'edit_link',
          text: 'Edit',
          event: { key: 'edit', id: line._id },
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
    private util: UtilService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.getChamberList();
    // this.getFloorList();
    this.getLineList();
  }

  ngAfterContentChecked(): void {
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

  async getLineList() {
    this.lineService.lines$.subscribe((data) => {
      this.lineList = data;
      this.lineList.sort(this.util.dynamicSortObject('priority'));
    });
  }  

  async onCreate(event: Line) {
    this.sendingData = true;
    const value = {
      ...event,
      slug: this.util.string_to_slug(event.name),
    } as Line;
    await this.lineService
      .create(value)
      .then((ref) => {
        console.log(ref);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
  async onUpdate(event: Line) {
    this.sendingData = true;
    const value = {
      ...event,
      slug: event.name.toLowerCase(),
      createdAt: this.line.createdAt,
    };
    await this.lineService
      .update(this.line._id, value)
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
      await this.lineService
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
    this.line = this.lineList.find((ln) => ln._id === id);
  }

  buttonEvent(event) {
    switch (event['key']) {
      case 'edit':
        this.line = this.lineList.find((ln) => ln._id === event['id']);
        console.log(this.line);
        break;
    }
  }

  clear() {
    this.line = null;
    this.errorMessage = '';
    this.sendingData = false;
  }
}
