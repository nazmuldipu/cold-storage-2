import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingAddComponent } from './loading-add.component';

describe('LoadingAddComponent', () => {
  let component: LoadingAddComponent;
  let fixture: ComponentFixture<LoadingAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
