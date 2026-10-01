import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tarjeta2 } from './tarjeta2';

describe('Tarjeta2', () => {
  let component: Tarjeta2;
  let fixture: ComponentFixture<Tarjeta2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tarjeta2],
    }).compileComponents();

    fixture = TestBed.createComponent(Tarjeta2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
