import { TestBed } from '@angular/core/testing';

import { InsertionService } from './insertion.service';

describe('InsertionService', () => {
  let service: InsertionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
