import { TestBed } from '@angular/core/testing';
import { TraspasoDatos } from './traspaso-datos';

describe('TraspasoDatos', () => {
  let service: TraspasoDatos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraspasoDatos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
