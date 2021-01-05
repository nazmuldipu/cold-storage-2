import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerAddComponent } from './ledger-add.component';

describe('LedgerAddComponent', () => {
  let component: LedgerAddComponent;
  let fixture: ComponentFixture<LedgerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LedgerAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
