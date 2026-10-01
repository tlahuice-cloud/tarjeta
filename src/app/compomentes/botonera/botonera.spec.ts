import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Botonera } from './botonera';

describe('Botonera', () => {
  let component: Botonera;
  let fixture: ComponentFixture<Botonera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Botonera],
    }).compileComponents();

    fixture = TestBed.createComponent(Botonera);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
