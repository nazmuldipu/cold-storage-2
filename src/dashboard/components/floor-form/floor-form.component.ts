import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Chamber } from 'src/shared/model/chamber.model';
import { Floor } from 'src/shared/model/floor.model';

@Component({
  selector: 'floor-form',
  templateUrl: './floor-form.component.html',
  styleUrls: ['./floor-form.component.scss'],
})
export class FloorFormComponent implements OnChanges {
  @Input() floor: Floor;
  @Input() chamberList: Chamber[];

  @Output() create = new EventEmitter<Floor>();
  @Output() update = new EventEmitter<Floor>();
  @Output() delete = new EventEmitter<any>();
  @Output() clear = new EventEmitter<any>();

  form: FormGroup;
  errorMessage: string = '';
  exists = false;
  mouseoverShifting = false;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.floor && this.floor != null) {
      this.form.reset();
      const ch = this.chamberList.find((c) => c._id == this.floor.chamber._id);
      const value = { ...this.floor, chamber: ch };
      this.exists = true;
      this.form.patchValue(value);
    }
  }

  createForm() {
    this.form = this.fb.group({
      chamber: ['', Validators.required],
      name: ['', Validators.required],
      capacity: ['', Validators.required],
    });
  }

  submit() {

    if (this.form.valid) {
      const fvlaue = this.form.value;
      const ch = {
        _id: fvlaue.chamber._id,
        name: fvlaue.chamber.name,
        slug: fvlaue.chamber.slug,
      };
      const value = { ...this.form.value, chamber: ch };
      if (this.exists) {
        this.update.emit(value);
      } else {
        this.create.emit(value);
      }
      this.clean();
    }
  }

  onDelete() {
    this.delete.emit(this.floor._id);
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
    this.floor = null;
    this.errorMessage = '';
    this.form.reset();
  }
}
