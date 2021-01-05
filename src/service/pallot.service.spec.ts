import { TestBed } from '@angular/core/testing';

import { PallotService } from './pallot.service';

describe('PallotService', () => {
  let service: PallotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PallotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
