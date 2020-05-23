import { TestBed } from '@angular/core/testing';

import { RcompanyRegisterService } from './rcompany-register.service';

describe('RcompanyRegisterService', () => {
  let service: RcompanyRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RcompanyRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
