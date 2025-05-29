import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-captura-medidor',
  standalone: true,
  templateUrl: './captura-medidor.page.html',
  styleUrls: ['./captura-medidor.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule, RouterModule],
})
export class CapturaMedidorPage {
  fotoBase64: string = '';
  latitud: number | null = null;
  longitud: number | null = null;

  nombre = '';
  contacto = '';
  habitada: boolean | null = null;
  contrato: boolean | null = null;
  tieneMedidor: boolean | null = null;
  numeroMedidor = '';
  numeroExterior = '';

  constructor(private api: ApiService, private router: Router) {}

  async tomarFoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.fotoBase64 = reader.result as string;
          this.obtenerUbicacion();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  async obtenerUbicacion() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.latitud = pos.coords.latitude;
        this.longitud = pos.coords.longitude;
      },
      () => {
        alert('No se pudo obtener la ubicación.');
      }
    );
  }

  async guardarRegistro() {
    console.log('🚀 Entrando a guardarRegistro');

    if (!this.fotoBase64 || !this.latitud || !this.longitud) {
      alert('Faltan datos obligatorios.');
      return;
    }

    const payload = {
      foto_url: this.fotoBase64,
      latitud: this.latitud,
      longitud: this.longitud,
      datos_json: {
        nombre: this.nombre,
        contacto: this.contacto,
        habitada: this.habitada,
        contrato: this.contrato,
        tieneMedidor: this.tieneMedidor,
        numeroMedidor: this.numeroMedidor,
        numeroExterior: this.numeroExterior,
      }
    };

    console.log('📤 Enviando a backend:', payload);

    try {
      await this.api.crearRegistro(payload);
      console.log('✅ Registro enviado con éxito');
      alert('Registro guardado correctamente');
      this.router.navigate(['/registros']);
    } catch (error) {
      console.error('❌ Error al guardar registro:', error);
      alert('Error al guardar el registro');
    }
  }
}
