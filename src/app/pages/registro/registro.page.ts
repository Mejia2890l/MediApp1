import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule, RouterModule],
})
export class RegistroPage {
  nombre = '';
  area = '';
  puesto = '';
  numero_usuario = '';
  password = '';
  mensaje = '';

  constructor(private api: ApiService, private router: Router) {}

  async registrar() {
    this.mensaje = '';
    try {
      await this.api.crearUsuario({
        nombre: this.nombre,
        area: this.area,
        puesto: this.puesto,
        numero_usuario: this.numero_usuario,
        password: this.password,
        rol: 'usuario' // o 'admin'
      });
      this.router.navigate(['/']);
    } catch (error) {
      this.mensaje = 'Error al registrar usuario.';
    }
  }
}
