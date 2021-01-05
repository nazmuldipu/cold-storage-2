import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PallotFormComponent } from './pallot-form.component';

describe('PallotFormComponent', () => {
  let component: PallotFormComponent;
  let fixture: ComponentFixture<PallotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PallotFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PallotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
