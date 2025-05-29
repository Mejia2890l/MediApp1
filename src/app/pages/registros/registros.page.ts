import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Importar FormsModule
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-registros',
  standalone: true,
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, FormsModule], // ✅ Añadir FormsModule aquí
})
export class RegistrosPage implements OnInit {
  registros: any[] = [];
  registrosFiltrados: any[] = [];
  cargando = true;

  // Filtros
  busqueda = '';
  habitada = '';
  contrato = '';
  tieneMedidor = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.obtenerRegistros().subscribe({
      next: (res) => {
        this.registros = Array.isArray(res) ? res : [];
        this.filtrar();
      },
      error: (err) => {
        console.error('Error al obtener registros', err);
        this.registros = [];
        this.filtrar();
      },
      complete: () => {
        this.cargando = false;
      }
    });
  }

  filtrar() {
    const termino = this.busqueda.toLowerCase();

    this.registrosFiltrados = this.registros.filter(reg => {
      const datos = reg.datos_json || {};
      const nombre = (datos.nombre || '').toLowerCase();
      const numeroMedidor = (datos.numeroMedidor || '').toLowerCase();

      const coincideBusqueda = nombre.includes(termino) || numeroMedidor.includes(termino);
      const coincideHabitada = this.habitada === '' || String(datos.habitada) === this.habitada;
      const coincideContrato = this.contrato === '' || String(datos.contrato) === this.contrato;
      const coincideMedidor = this.tieneMedidor === '' || String(datos.tieneMedidor) === this.tieneMedidor;

      return coincideBusqueda && coincideHabitada && coincideContrato && coincideMedidor;
    });
  }
}
