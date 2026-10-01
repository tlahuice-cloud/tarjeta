import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Invitacion } from './invitacion';

describe('Invitacion', () => {
  let component: Invitacion;
  let fixture: ComponentFixture<Invitacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Invitacion],
    }).compileComponents();

    fixture = TestBed.createComponent(Invitacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
