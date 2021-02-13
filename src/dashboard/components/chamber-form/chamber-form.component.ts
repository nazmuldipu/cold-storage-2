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

@Component({
  selector: 'chamber-form',
  templateUrl: './chamber-form.component.html',
  styleUrls: ['./chamber-form.component.scss'],
})
export class ChamberFormComponent implements OnChanges {
  @Input() chamber: Chamber;

  @Output() create = new EventEmitter<Chamber>();
  @Output() update = new EventEmitter<Chamber>();
  @Output() delete = new EventEmitter<string>();

  form: FormGroup;
  errorMessage: string = '';
  exists = false;
  mouseoverShifting = false;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.chamber && this.chamber != null) {
      this.form.reset();
      this.exists = true;
      this.form.patchValue(this.chamber);
    }
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      capacity: [0, Validators.required],
    });
  }

  submit() {
    console.log(this.form.value);
    if (this.form.valid) {
      if (this.exists) {
        this.update.emit(this.form.value);
      } else {
        this.create.emit(this.form.value);
      }
      this.clear();
    }
  }

  onDelete() {
    this.delete.emit(this.chamber._id);
    this.clear();
  }

  clear() {
    this.exists = false;
    this.chamber = null;
    this.errorMessage = '';
    this.form.reset();
    const value = { capacity: 0 };
    this.form.patchValue(value);
  }
}
