import { TestBed } from '@angular/core/testing';

import { RideRegisterService } from './ride-register.service';

describe('RideRegisterService', () => {
  let service: RideRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
