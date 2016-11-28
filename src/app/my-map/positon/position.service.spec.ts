import {TestBed, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {PositionService} from './position.service';
import {BaseRequestOptions, Http} from "@angular/http";

describe('Service: Position', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PositionService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions],
        },
      ],
    });
  });

  it('change webdis url', inject([PositionService], (service: PositionService) => {
    let url = 'http://test.url';
    service.setWebidsUrl(url);
    expect(service.getWebidsUrl()).toBe(url);
  }));

});
