import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/shared/forms/base-form/base-form.component';

@Component({
  selector: 'chamber-form',
  templateUrl: './chamber-form.component.html',
  styleUrls: ['./chamber-form.component.scss'],
})
export class ChamberFormComponent extends BaseFormComponent {
  
  constructor(private fb: FormBuilder) {
    super();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      capacity: ['', Validators.required],
    });
  }
}
