import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  form: FormGroup;
  min;
  max;
  constructor(private fb: FormBuilder) {
    this.min = 0;
    this.max = 72;
    this.createForm(this.min, this.max);
  }

  ngOnInit(): void {}

  createForm(min, max) {
    this.form = this.fb.group({
      capacity: ['', [Validators.min(min), Validators.max(max)]],
    });
  }

  submit() {
    console.log(this.form.value);
    console.log(this.form.controls['capacity'].errors);
  }
}
