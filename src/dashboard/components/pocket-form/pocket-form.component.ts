import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Chamber } from 'src/shared/model/chamber.model';
import { Floor } from 'src/shared/model/floor.model';
import { Line } from 'src/shared/model/line.model';
import { Pocket } from 'src/shared/model/pocket.model';

@Component({
  selector: 'pocket-form',
  templateUrl: './pocket-form.component.html',
  styleUrls: ['./pocket-form.component.scss'],
})
export class PocketFormComponent implements OnChanges {
  @Input() pocket: Pocket;
  @Input() lineList: Line[];
  @Input() floorList: Floor[];
  @Input() chamberList: Chamber[];

  @Output() create = new EventEmitter<Floor>();
  @Output() update = new EventEmitter<Floor>();
  @Output() delete = new EventEmitter<any>();
  @Output() clear = new EventEmitter<any>();
  @Output() selectChamber = new EventEmitter<string>();
  @Output() selectFloor = new EventEmitter<string>();

  form: FormGroup;
  errorMessage: string = '';
  // showForm = false;
  exists = false;
  mouseoverShifting = false;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pocket && this.pocket != null) {
      this.form.reset();
      const ch = this.chamberList.find((c) => c._id == this.pocket.chamber._id);
      const value = { chamberId: ch._id };
      this.form.patchValue(value);
      this.selectChamber.emit(ch._id);
    }
    if (changes.floorList && this.pocket && this.pocket._id != null) {
      const fl = this.floorList.find((f) => f._id == this.pocket.floor._id);
      const value = { floorId: fl._id };
      this.form.patchValue(value);
      this.selectFloor.emit(fl._id);
    }
    if (changes.lineList && this.pocket && this.pocket._id != null) {
      const ls = this.lineList.find((ln) => ln._id == this.pocket.line._id);
      const value = { ...this.pocket, lineId: ls._id };
      delete value['chamber'];
      delete value['floor'];
      this.exists = true;
      // this.showForm = true;
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
    // const value = JSON.parse(event.target.value) as Chamber;
    // this.form.controls.chamber.setValue(value);
    this.selectChamber.emit(event);
  }

  onFloorChange(event) {
    this.selectFloor.emit(event);
  }

  // onSelectLine(event) {
  //   this.showForm = true;
  // }

  submit() {
    if (this.form.valid) {
      const fvlaue = this.form.value;
      const chamber = this.chamberList.find(
        (ch) => ch._id === fvlaue.chamberId
      );
      const floor = this.floorList.find((fl) => fl._id === fvlaue.floorId);
      const line = this.lineList.find((ln) => ln._id === fvlaue.lineId);
      const ch = { _id: chamber._id, name: chamber.name, slug: chamber.slug };
      const fl = { _id: floor._id, name: floor.name, slug: floor.slug };
      const ln = { _id: line._id, name: line.name, slug: line.slug };
      const value = { ...this.form.value, chamber: ch, floor: fl, line: ln };
      delete value['chamberId'];
      delete value['floorId'];
      delete value['lineId'];

      if (this.exists) {
        this.update.emit(value);
      } else {
        this.create.emit(value);
      }
      this.clean();
    }
  }

  onDelete() {
    this.delete.emit(this.pocket._id);
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
    // this.showForm = false;
    this.floorList = null;
    this.lineList = null;
    this.pocket = null;
    this.errorMessage = '';
    this.form.reset();
  }
}
