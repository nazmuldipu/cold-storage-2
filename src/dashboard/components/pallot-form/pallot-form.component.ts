import { Component, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { Pallot } from 'src/shared/model/pallot.model';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Line } from 'src/shared/model/line.model';
import { Floor } from 'src/shared/model/floor.model';
import { Chamber } from 'src/shared/model/chamber.model';
import { Inventory } from 'src/shared/model/inventory.model';
import { InventoryService } from 'src/service/inventory.service';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Pocket } from 'src/shared/model/pocket.model';
import { UtilService } from 'src/service/util.service';

@Component({
  selector: 'pallot-form',
  templateUrl: './pallot-form.component.html',
  styleUrls: ['./pallot-form.component.scss']
})
export class PallotFormComponent implements OnChanges {
  @Input() pallot: Pallot;
  @Input() lineList: Line[];
  @Input() floorList: Floor[];
  @Input() pocketList: Pocket[];
  @Input() chamberList: Chamber[];

  @Output() create = new EventEmitter<Floor>();
  @Output() update = new EventEmitter<Floor>();
  @Output() delete = new EventEmitter<any>();
  @Output() clear = new EventEmitter<any>();
  @Output() selectChamber = new EventEmitter<string>();
  @Output() selectFloor = new EventEmitter<string>();
  @Output() selectLine = new EventEmitter<string>();

  ngDate;
  form: FormGroup;
  errorMessage: string = '';
  showForm = false;
  exists = false;
  mouseoverShifting = false;
  inventoryList: Inventory[];
  searchInventory = (text$: Observable<any>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        const res = term.length < 2 ? []
          : this.inventoryList.filter(v => v.sr_no.indexOf(term.toLowerCase()) > -1 && v.year == this.ngDate.year).slice(0, 10)
        const names = res.map(r => r.sr_no);
        return names;
      })
    )

  constructor(private fb: FormBuilder, private inventoryService: InventoryService,
    private util: UtilService) {
    this.ngDate = this.util.convertJsDateToNgbDate(new Date());

    this.createForm();
    this.getInventoryList();
  }

  async getInventoryList() {
    this.inventoryService.inventorys$.subscribe(data => { this.inventoryList = data; })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pallot && this.pallot != null) {
      this.form.reset();
      const ch = this.chamberList.find((c) => c._id == this.pallot.chamber._id);
      const value = { chamber: ch };
      this.form.patchValue(value);
      this.selectChamber.emit(ch._id);
    }
    if (changes.floorList && this.pallot && this.pallot._id != null) {
      const fl = this.floorList.find((f) => f._id == this.pallot.floor._id);
      const value = { floor: fl };
      this.form.patchValue(value);
      this.selectFloor.emit(fl._id);
    }
    if (changes.lineList && this.pallot && this.pallot._id != null) {
      const ls = this.lineList.find((ln) => ln._id == this.pallot.line._id);
      const value = { ...this.pallot, line: ls };
      delete value['chamber'];
      delete value['floor'];
      this.exists = true;
      this.showForm = true;
      this.form.patchValue(value);
    }
  }

  createForm() {
    this.form = this.fb.group({
      date: [this.ngDate, Validators.required],
      year: [this.ngDate.year, Validators.required],
      chamber: ['', Validators.required],
      floor: ['', Validators.required],
      line: ['', Validators.required],
      pocket: ['', Validators.required],
      sr_no: ['', Validators.required]
    });
  }

  onChamberChange(event) {
    const value = JSON.parse(event.target.value) as Chamber;
    this.form.controls.chamber.setValue(value);
    this.selectChamber.emit(value._id);
  }

  onFloorChange(event) {
    const value = JSON.parse(event.target.value) as Floor;
    this.form.controls.floor.setValue(value);
    console.log(value);
    this.selectFloor.emit(value._id);
  }

  onLineChange(event) {
    console.log(event.target.value);
    const value = JSON.parse(event.target.value) as Line;
    this.form.controls.line.setValue(value);
    this.selectLine.emit(value._id);
  }

  onSelectLine(event) {
    if (event.value._id) {
      this.showForm = true;
    }
  }

  submit() {
    if (this.form.valid) {
      const fvalue = this.form.value;
      const ch = {
        _id: fvalue.chamber._id,
        name: fvalue.chamber.name
      };
      const fl = {
        _id: fvalue.floor._id,
        name: fvalue.floor.name
      };
      const lin = {
        _id: fvalue.line._id,
        name: fvalue.line.name
      }
      const poc = {
        _id: fvalue.pocket._id,
        name: fvalue.pocket.name
      }
      const dateValue = this.util.convertNgbDateToJsDate(fvalue.date);
      const value = { ...this.form.value, chamber: ch, floor: fl, line: lin, date: dateValue, pocket: poc };
      if (this.exists) {
        this.update.emit(value);
      } else {
        this.create.emit(value);
      }
      this.clean();
    }
  }

  onDelete() {
    this.delete.emit(this.pallot._id);
    this.clean();
  }

  getFormValidationErrors() {
    let errors = '';
    Object.keys(this.form.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          errors += key + ' : ' + keyError + '; ';
        });
      }
    });
    return errors;
  }

  clean() {
    this.exists = false;
    this.showForm = false;
    this.floorList = null;
    this.lineList = null;
    this.pallot = null;
    this.errorMessage = '';
    this.form.reset();
  }
}
