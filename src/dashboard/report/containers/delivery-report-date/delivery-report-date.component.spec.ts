import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryReportDateComponent } from './delivery-report-date.component';

describe('DeliveryReportDateComponent', () => {
  let component: DeliveryReportDateComponent;
  let fixture: ComponentFixture<DeliveryReportDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryReportDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryReportDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
