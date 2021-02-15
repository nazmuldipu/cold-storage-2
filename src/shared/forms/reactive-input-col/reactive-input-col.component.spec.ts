import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveInputColComponent } from './reactive-input-col.component';

describe('ReactiveInputColComponent', () => {
  let component: ReactiveInputColComponent;
  let fixture: ComponentFixture<ReactiveInputColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveInputColComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveInputColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
