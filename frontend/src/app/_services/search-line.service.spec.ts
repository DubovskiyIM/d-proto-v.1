import { TestBed } from '@angular/core/testing';

import { SearchLineService } from './search-line.service';

describe('SearchLineService', () => {
  let service: SearchLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
