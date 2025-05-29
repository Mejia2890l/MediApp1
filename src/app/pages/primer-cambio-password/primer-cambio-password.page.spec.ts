import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimerCambioPasswordPage } from './primer-cambio-password.page';

describe('PrimerCambioPasswordPage', () => {
  let component: PrimerCambioPasswordPage;
  let fixture: ComponentFixture<PrimerCambioPasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimerCambioPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
