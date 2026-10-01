import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tarjeta3 } from './tarjeta3';

describe('Tarjeta3', () => {
  let component: Tarjeta3;
  let fixture: ComponentFixture<Tarjeta3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tarjeta3],
    }).compileComponents();

    fixture = TestBed.createComponent(Tarjeta3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
