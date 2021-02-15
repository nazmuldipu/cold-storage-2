import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportHeadComponent } from './report-head.component';

describe('ReportHeadComponent', () => {
  let component: ReportHeadComponent;
  let fixture: ComponentFixture<ReportHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
