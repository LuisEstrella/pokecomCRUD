import { TestBed } from '@angular/core/testing';

import { PokemonCrudService } from './pokemon-crud.service';

describe('PokemonCrudService', () => {
  let service: PokemonCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
