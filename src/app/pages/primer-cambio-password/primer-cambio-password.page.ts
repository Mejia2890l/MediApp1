import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-primer-cambio-password',
  standalone: true,
  templateUrl: './primer-cambio-password.page.html',
  styleUrls: ['./primer-cambio-password.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule, RouterModule],
})
export class PrimerCambioPasswordPage {
  nuevaPassword = '';
  confirmarPassword = '';
  mensaje = '';

  constructor(private api: ApiService, private router: Router) {}

  async cambiar() {
    this.mensaje = '';

    if (this.nuevaPassword !== this.confirmarPassword) {
      this.mensaje = 'Las contraseñas no coinciden';
      return;
    }

    try {
      await this.api.cambiarPassword(this.nuevaPassword).toPromise();
      alert('Contraseña actualizada correctamente');
      this.router.navigate(['/home']);
    } catch (error) {
      this.mensaje = 'Error al cambiar la contraseña';
    }
  }
}
