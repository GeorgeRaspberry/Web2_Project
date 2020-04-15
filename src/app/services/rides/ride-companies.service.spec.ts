import { TestBed } from '@angular/core/testing';

import { RideCompaniesService } from './ride-companies.service';

describe('RideCompaniesService', () => {
  let service: RideCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
