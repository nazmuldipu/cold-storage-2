import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPrintComponent } from './delivery-print.component';

describe('DeliveryPrintComponent', () => {
  let component: DeliveryPrintComponent;
  let fixture: ComponentFixture<DeliveryPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
