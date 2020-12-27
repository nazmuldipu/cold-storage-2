import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketFormComponent } from './pocket-form.component';

describe('PocketFormComponent', () => {
  let component: PocketFormComponent;
  let fixture: ComponentFixture<PocketFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocketFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PocketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
