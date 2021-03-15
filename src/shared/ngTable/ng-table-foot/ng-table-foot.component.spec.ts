import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTableFootComponent } from './ng-table-foot.component';

describe('NgTableFootComponent', () => {
  let component: NgTableFootComponent;
  let fixture: ComponentFixture<NgTableFootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgTableFootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTableFootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
