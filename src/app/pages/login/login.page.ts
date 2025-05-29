import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule, RouterModule],
})
export class LoginPage {
  numero_usuario = '';
  password = '';
  mensaje = '';

  constructor(private api: ApiService, private router: Router) {}

  async iniciarSesion() {
    this.mensaje = '';

    try {
      const res: any = await this.api.login(this.numero_usuario, this.password).toPromise();

      this.api.setToken(res.token);
      const usuario = res.usuario;

      console.log('🧪 DEBUG => requiere_cambio_password:', usuario.requiere_cambio_password, '| tipo:', typeof usuario.requiere_cambio_password);

      // Evaluar tanto boolean como número (por si viene como 1)
      if (usuario.requiere_cambio_password === true || usuario.requiere_cambio_password === 1) {
        console.log('➡️ Redirigiendo a /cambiar-password');
        this.router.navigate(['/cambiar-password']);
      } else {
        console.log('➡️ Redirigiendo a /home');
        this.router.navigate(['/home']);
      }

    } catch (error: any) {
      console.error('❌ Error en login:', error);
      this.mensaje = 'Credenciales incorrectas';
    }
  }
}
