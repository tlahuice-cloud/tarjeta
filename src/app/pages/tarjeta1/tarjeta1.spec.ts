import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tarjeta1 } from './tarjeta1';

describe('Tarjeta1', () => {
  let component: Tarjeta1;
  let fixture: ComponentFixture<Tarjeta1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tarjeta1],
    }).compileComponents();

    fixture = TestBed.createComponent(Tarjeta1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
