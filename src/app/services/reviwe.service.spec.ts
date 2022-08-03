import { TestBed } from '@angular/core/testing';

import { ReviweService } from './reviwe.service';

describe('ReviweService', () => {
  let service: ReviweService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviweService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
