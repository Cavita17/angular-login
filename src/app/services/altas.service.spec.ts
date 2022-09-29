import { TestBed } from '@angular/core/testing';

import { AltasService } from './altas.service';

describe('AltasService', () => {
  let service: AltasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AltasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
