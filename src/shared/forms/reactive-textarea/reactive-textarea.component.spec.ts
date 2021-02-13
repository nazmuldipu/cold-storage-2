import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveTextareaComponent } from './reactive-textarea.component';

describe('ReactiveTextareaComponent', () => {
  let component: ReactiveTextareaComponent;
  let fixture: ComponentFixture<ReactiveTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveTextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
