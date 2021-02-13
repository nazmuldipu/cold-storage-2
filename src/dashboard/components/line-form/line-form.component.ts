import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/shared/forms/base-form/base-form.component';
import { Chamber } from 'src/shared/model/chamber.model';
import { Floor } from 'src/shared/model/floor.model';

@Component({
  selector: 'line-form',
  templateUrl: './line-form.component.html',
  styleUrls: ['./line-form.component.scss'],
})
export class LineFormComponent extends BaseFormComponent {
  @Input() floorList: Floor[];
  @Input() chamberList: Chamber[];

  @Output() clear = new EventEmitter<any>();
  @Output() selectChamber = new EventEmitter<string>();

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
      const value = { ...this.item, floorId: fl._id };
      delete value['chamber'];
      this.exists = true;
      this.form.patchValue(value);
    }
  }

  createForm() {
    this.form = this.fb.group({
      chamberId: ['', Validators.required],
      floorId: ['', Validators.required],
      name: ['', Validators.required],
      capacity: ['', Validators.required],
    });
  }

  onChamberChange(event) {
    this.selectChamber.emit(event);
  }

  submit() {
    if (this.form.valid) {
      const fvalue = this.form.value;
      const ch = this.chamberList.find((ch) => ch._id === fvalue.chamberId);
      const fl = this.floorList.find((fl) => fl._id === fvalue.floorId);

      const chamber = { _id: ch._id, name: ch.name };
      const floor = { _id: fl._id, name: fl.name };
      const value = { ...this.form.value, chamber, floor };

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
  }
}
