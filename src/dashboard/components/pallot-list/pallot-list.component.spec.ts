import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PallotListComponent } from './pallot-list.component';

describe('PallotListComponent', () => {
  let component: PallotListComponent;
  let fixture: ComponentFixture<PallotListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PallotListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PallotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
