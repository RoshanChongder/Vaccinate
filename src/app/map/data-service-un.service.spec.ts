import { TestBed } from '@angular/core/testing';

import { DataServiceUNService } from './data-service-un.service';

describe('DataServiceUNService', () => {
  let service: DataServiceUNService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataServiceUNService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
