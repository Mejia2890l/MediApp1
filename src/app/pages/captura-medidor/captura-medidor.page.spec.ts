import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapturaMedidorPage } from './captura-medidor.page';

describe('CapturaMedidorPage', () => {
  let component: CapturaMedidorPage;
  let fixture: ComponentFixture<CapturaMedidorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaMedidorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
