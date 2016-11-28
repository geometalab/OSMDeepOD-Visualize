/* tslint:disable:no-unused-variable */

import {TestBed, async} from '@angular/core/testing';
import {MyMapComponent} from './my-map.component';
import {PositionService} from "./positon/position.service";


describe('Component: MyMap', () => {


  beforeEach(() => {
    let positionServiceStub = {
      webdisUrl: 'http://sifs0002.hsr.ch:40003/'
    };

    TestBed.configureTestingModule({
      declarations: [MyMapComponent],
      providers: [{provide: PositionService, useValue: positionServiceStub}]
    });

  });

  it('should create an instance', () => {
    let fixture = TestBed.createComponent(MyMapComponent);
    let myMapComponent = fixture.componentInstance;
    let positionService = TestBed.get(PositionService);
    expect(myMapComponent).toBeTruthy();
  });
});
