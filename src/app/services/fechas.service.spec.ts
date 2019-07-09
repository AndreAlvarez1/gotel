import { TestBed } from '@angular/core/testing';

import { FechasService } from './fechas.service';

describe('FechasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FechasService = TestBed.get(FechasService);
    expect(service).toBeTruthy();
  });
});
