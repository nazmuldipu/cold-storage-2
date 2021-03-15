import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTableHeadComponent } from './ng-table-head.component';

describe('NgTableHeadComponent', () => {
  let component: NgTableHeadComponent;
  let fixture: ComponentFixture<NgTableHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgTableHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTableHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
