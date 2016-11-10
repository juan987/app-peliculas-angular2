/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServicioPeliculasDaoService } from './servicio-peliculas-dao.service';

describe('Service: ServicioPeliculasDao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioPeliculasDaoService]
    });
  });

  it('should ...', inject([ServicioPeliculasDaoService], (service: ServicioPeliculasDaoService) => {
    expect(service).toBeTruthy();
  }));
});
