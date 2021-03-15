import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTableBodyComponent } from './ng-table-body.component';

describe('NgTableBodyComponent', () => {
  let component: NgTableBodyComponent;
  let fixture: ComponentFixture<NgTableBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgTableBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTableBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
