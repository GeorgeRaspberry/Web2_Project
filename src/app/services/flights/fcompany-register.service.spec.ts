import { TestBed } from '@angular/core/testing';

import { FcompanyRegisterService } from './fcompany-register.service';

describe('FcompanyRegisterService', () => {
  let service: FcompanyRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FcompanyRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
