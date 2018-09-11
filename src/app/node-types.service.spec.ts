import { TestBed, inject } from '@angular/core/testing';

import { NodeTypesService } from './node-types.service';

describe('NodeTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeTypesService]
    });
  });

  it('should be created', inject([NodeTypesService], (service: NodeTypesService) => {
    expect(service).toBeTruthy();
  }));
});
