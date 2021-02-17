import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashHeadCardComponent } from './dash-head-card.component';

describe('DashHeadCardComponent', () => {
  let component: DashHeadCardComponent;
  let fixture: ComponentFixture<DashHeadCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashHeadCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashHeadCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
