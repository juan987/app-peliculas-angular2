/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServicioHttpService } from './servicio-http.service';

describe('Service: ServicioHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioHttpService]
    });
  });

  it('should ...', inject([ServicioHttpService], (service: ServicioHttpService) => {
    expect(service).toBeTruthy();
  }));
});
