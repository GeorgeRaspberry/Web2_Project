import { TestBed } from '@angular/core/testing';

import { FlightCompaniesService } from './flight-companies.service';

describe('FlightCompaniesService', () => {
  let service: FlightCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
