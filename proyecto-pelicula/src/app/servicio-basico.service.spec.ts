/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServicioBasicoService } from './servicio-basico.service';

describe('Service: ServicioBasico', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioBasicoService]
    });
  });

  it('should ...', inject([ServicioBasicoService], (service: ServicioBasicoService) => {
    expect(service).toBeTruthy();
  }));
});
