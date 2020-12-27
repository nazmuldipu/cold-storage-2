import { TestBed } from '@angular/core/testing';

import { ChamberTypeService } from './chamber-type.service';

describe('ChamberTypeService', () => {
  let service: ChamberTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChamberTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
