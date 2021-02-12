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
      const value = { chamber: ch };
      this.form.patchValue(value);
      this.selectChamber.emit(ch._id);
    }
    if (changes.floorList && this.line && this.line._id != null) {
      const fl = this.floorList.find((f) => f._id == this.line.floor._id);
      const value = { ...this.line, floor: fl };
      delete value['chamber'];
      this.exists = true;
      this.showForm = true;
      this.form.patchValue(value);
    }
  }

  createForm() {
    this.form = this.fb.group({
      chamber: ['', Validators.required],
      floor: ['', Validators.required],
      name: ['', Validators.required],
      capacity: ['', Validators.required],
    });
  }

  onChamberChange(event) {
    const value = JSON.parse(event.target.value) as Chamber;
    this.form.controls.chamber.setValue(value);
    this.selectChamber.emit(value._id);
  }

  onSelectFlorr(event) {
    if (event.value._id) {
      this.showForm = true;
    }
  }

  submit() {
    if (this.form.valid) {
      const fvlaue = this.form.value;
      console.log(fvlaue);
      const ch = {
        _id: fvlaue.chamber._id,
        name: fvlaue.chamber.name,
        slug: fvlaue.chamber.slug,
      };
      const fl = {
        _id: fvlaue.floor._id,
        name: fvlaue.floor.name,
        slug: fvlaue.floor.slug,
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
    this.line = null;
    this.errorMessage = '';
    this.form.reset();
  }
}
