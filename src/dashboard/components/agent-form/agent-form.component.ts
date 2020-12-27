import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Agent } from 'src/shared/model/agent.model';

@Component({
  selector: 'agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss'],
})
export class AgentFormComponent implements OnChanges {
  @Input() agent: Agent;

  @Output() create = new EventEmitter<Agent>();
  @Output() update = new EventEmitter<Agent>();
  @Output() delete = new EventEmitter<string>();

  form: FormGroup;
  errorMessage: string = '';
  exists = false;
  mouseoverShifting = false;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.agent && this.agent != null) {
      this.form.reset();
      this.exists = true;
      this.form.patchValue(this.agent);
    }
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      father: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^01[3-9][ ]?[0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$'),
        ],
      ],
      address: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      if (this.exists) {
        this.update.emit(this.form.value);
      } else {
        this.create.emit(this.form.value);
      }
      this.clear();
    }
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

  onDelete() {
    this.delete.emit(this.agent._id);
    this.clear();
  }

  clear() {
    this.exists = false;
    this.agent = null;
    this.errorMessage = '';
    this.form.reset();
  }
}
