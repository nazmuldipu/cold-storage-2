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
      const value = { ...this.floor, chamberId: ch._id };
      this.exists = true;
      this.form.patchValue(value);
    }
  }

  createForm() {
    this.form = this.fb.group({
      chamberId: ['', Validators.required],
      name: ['', Validators.required],
      capacity: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const fvlaue = this.form.value;
      const chamber = this.chamberList.find(
        (ch) => ch._id === fvlaue.chamberId
      );
      const ch = {
        _id: chamber._id,
        name: chamber.name,
        slug: chamber.slug,
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

  clean() {
    this.exists = false;
    this.floor = null;
    this.errorMessage = '';
    this.form.reset();
  }
}
