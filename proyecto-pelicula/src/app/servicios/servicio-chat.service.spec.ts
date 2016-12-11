/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServivioChatService } from './servivio-chat.service';

describe('Service: ServivioChat', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServivioChatService]
    });
  });

  it('should ...', inject([ServivioChatService], (service: ServivioChatService) => {
    expect(service).toBeTruthy();
  }));
});
