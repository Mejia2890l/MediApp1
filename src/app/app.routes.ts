import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/registro/registro.page').then(m => m.RegistroPage),
  },
  {
    path: 'cambiar-password',
    loadComponent: () =>
      import('./pages/primer-cambio-password/primer-cambio-password.page').then(
        m => m.PrimerCambioPasswordPage
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then(m => m.HomePage),
  },
  {
    path: 'captura',
    loadComponent: () =>
      import('./pages/captura-medidor/captura-medidor.page').then(
        m => m.CapturaMedidorPage
      ),
  },
  {
    path: 'registros',
    loadComponent: () =>
      import('./pages/registros/registros.page').then(m => m.RegistrosPage),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/admin.page').then(m => m.AdminPage),
  },
];
