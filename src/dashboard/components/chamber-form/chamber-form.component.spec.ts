import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamberFormComponent } from './chamber-form.component';

describe('ChamberFormComponent', () => {
  let component: ChamberFormComponent;
  let fixture: ComponentFixture<ChamberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChamberFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
