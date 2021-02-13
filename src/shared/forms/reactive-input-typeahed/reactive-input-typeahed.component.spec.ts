import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveInputTypeahedComponent } from './reactive-input-typeahed.component';

describe('ReactiveInputTypeahedComponent', () => {
  let component: ReactiveInputTypeahedComponent;
  let fixture: ComponentFixture<ReactiveInputTypeahedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveInputTypeahedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveInputTypeahedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
