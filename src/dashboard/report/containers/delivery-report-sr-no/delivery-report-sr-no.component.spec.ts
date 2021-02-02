import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryReportSrNoComponent } from './delivery-report-sr-no.component';

describe('DeliveryReportSrNoComponent', () => {
  let component: DeliveryReportSrNoComponent;
  let fixture: ComponentFixture<DeliveryReportSrNoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryReportSrNoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryReportSrNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
