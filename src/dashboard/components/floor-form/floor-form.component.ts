import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/shared/forms/base-form/base-form.component';
import { Chamber } from 'src/shared/model/chamber.model';

@Component({
  selector: 'floor-form',
  templateUrl: './floor-form.component.html',
  styleUrls: ['./floor-form.component.scss'],
})
export class FloorFormComponent extends BaseFormComponent {
  @Input() chamberList: Chamber[];

  @Output() clear = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    super();
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item && this.item != null) {
      this.form.reset();
      const ch = this.chamberList.find((c) => c._id == this.item.chamber._id);
      const value = { ...this.item, chamberId: ch._id };
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
      const ch = this.chamberList.find((ch) => ch._id === fvlaue.chamberId);
      const chamber = { _id: ch._id, name: ch.name, slug: ch.slug };
      const value = { ...this.form.value, chamber };
      if (this.exists) {
        this.update.emit(value);
      } else {
        this.create.emit(value);
      }
      this.clean();
    }
  }
}
