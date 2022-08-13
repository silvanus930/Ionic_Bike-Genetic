import { TestBed } from '@angular/core/testing';

import { WindowswerviceService } from './windowswervice.service';

describe('WindowswerviceService', () => {
  let service: WindowswerviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowswerviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
