import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/shared/forms/base-form/base-form.component';
import { Chamber } from 'src/shared/model/chamber.model';
import { Floor } from 'src/shared/model/floor.model';
import { Line } from 'src/shared/model/line.model';

@Component({
  selector: 'pocket-form',
  templateUrl: './pocket-form.component.html',
  styleUrls: ['./pocket-form.component.scss'],
})
export class PocketFormComponent extends BaseFormComponent {
  @Input() lineList: Line[];
  @Input() floorList: Floor[];
  @Input() chamberList: Chamber[];

  @Output() clear = new EventEmitter<any>();
  @Output() selectChamber = new EventEmitter<string>();
  @Output() selectFloor = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    super();
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item && this.item != null) {
      this.form.reset();
      const ch = this.chamberList.find((c) => c._id == this.item.chamber._id);
      const value = { chamberId: ch._id };
      this.form.patchValue(value);
      this.selectChamber.emit(ch._id);
    }
    if (changes.floorList && this.item && this.item._id != null) {
      const fl = this.floorList.find((f) => f._id == this.item.floor._id);
      const value = { floorId: fl._id };
      this.form.patchValue(value);
      this.selectFloor.emit(fl._id);
    }
    if (changes.lineList && this.item && this.item._id != null) {
      const ls = this.lineList.find((ln) => ln._id == this.item.line._id);
      const value = { ...this.item, lineId: ls._id };
      "chamber floor".split(" ").forEach(e => delete value[e]);
      this.exists = true;
      this.form.patchValue(value);
    }
  }

  createForm() {
    this.form = this.fb.group({
      chamberId: ['', Validators.required],
      floorId: ['', Validators.required],
      lineId: ['', Validators.required],
      name: ['', Validators.required],
      capacity: ['', Validators.required],
    });
  }

  onChamberChange(event) {
    this.selectChamber.emit(event);
  }

  onFloorChange(event) {
    this.selectFloor.emit(event);
  }

  submit() {
    if (this.form.valid) {
      const fvlaue = this.form.value;

      const ch = this.chamberList.find((ch) => ch._id === fvlaue.chamberId);
      const chamber = { _id: ch._id, name: ch.name };

      const fl = this.floorList.find((fl) => fl._id === fvlaue.floorId);
      const floor = { _id: fl._id, name: fl.name };

      const ln = this.lineList.find((ln) => ln._id === fvlaue.lineId);
      const line = { _id: ln._id, name: ln.name };

      const value = { ...this.form.value, chamber, floor, line };
      "chamberId floorId lineId".split(" ").forEach(e => delete value[e]);

      if (this.exists) {
        this.update.emit(value);
      } else {
        this.create.emit(value);
      }
      this.clean();
    }
  }

  clean() {
    super.clean();
    this.floorList = null;
    this.lineList = null;
  }
}
