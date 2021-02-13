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

@Component({
  selector: 'line-form',
  templateUrl: './line-form.component.html',
  styleUrls: ['./line-form.component.scss'],
})
export class LineFormComponent implements OnChanges {
  @Input() line: Line;
  @Input() floorList: Floor[];
  @Input() chamberList: Chamber[];

  @Output() create = new EventEmitter<Floor>();
  @Output() update = new EventEmitter<Floor>();
  @Output() delete = new EventEmitter<any>();
  @Output() clear = new EventEmitter<any>();
  @Output() selectChamber = new EventEmitter<string>();

  form: FormGroup;
  errorMessage: string = '';
  showForm = false;
  exists = false;
  mouseoverShifting = false;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.line && this.line != null) {
      this.form.reset();
      const ch = this.chamberList.find((c) => c._id == this.line.chamber._id);
      const value = { chamberId: ch._id };
      this.form.patchValue(value);
      this.selectChamber.emit(ch._id);
    }
    if (changes.floorList && this.line && this.line._id != null) {
      const fl = this.floorList.find((f) => f._id == this.line.floor._id);
      const value = { ...this.line, floorId: fl._id };
      delete value['chamber'];
      this.exists = true;
      this.showForm = true;
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

  onSelectFlorr(event) {
    if (event.value._id) {
      this.showForm = true;
    }
  }

  submit() {
    if (this.form.valid) {
      const fvalue = this.form.value;
      const chamber = this.chamberList.find(
        (ch) => ch._id === fvalue.chamberId
      );
      const floor = this.floorList.find((fl) => fl._id === fvalue.floorId);

      const ch = {
        _id: chamber._id,
        name: chamber.name,
        slug: chamber.slug,
      };
      const fl = {
        _id: floor._id,
        name: floor.name,
        slug: floor.slug,
      };
      const value = { ...this.form.value, chamber: ch, floor: fl };

      if (this.exists) {
        this.update.emit(value);
      } else {
        this.create.emit(value);
      }
      this.clean();
    }
  }

  onDelete() {
    this.delete.emit(this.line._id);
    this.clean();
  }

  clean() {
    this.exists = false;
    this.showForm = false;
    this.floorList = null;
    this.line = null;
    this.errorMessage = '';
    this.form.reset();
  }
}
