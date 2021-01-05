import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PallotComponent } from './pallot.component';

describe('PallotComponent', () => {
  let component: PallotComponent;
  let fixture: ComponentFixture<PallotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PallotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PallotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
