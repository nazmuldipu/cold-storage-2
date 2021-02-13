import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveDatePickerComponent } from './reactive-date-picker.component';

describe('ReactiveDatePickerComponent', () => {
  let component: ReactiveDatePickerComponent;
  let fixture: ComponentFixture<ReactiveDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveDatePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
