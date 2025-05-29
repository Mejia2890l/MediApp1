import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token: string | null = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    this.token = this.token || localStorage.getItem('token');
    return this.token;
  }

  getHeaders() {
    const token = this.getToken();
    console.log('🪪 Token usado en headers:', token);
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  login(numero_usuario: string, password: string): Observable<any> {
    return this.http.post(`${API_URL}/auth/login`, { numero_usuario, password });
  }

  cambiarPassword(nuevaPassword: string): Observable<any> {
    return this.http.post(`${API_URL}/auth/cambiar-password`, { nuevaPassword }, this.getHeaders());
  }

  crearRegistro(data: any): Observable<any> {
    console.log('📡 [ANTES DE HTTP POST] creando registro...');
    const req = this.http.post(`${API_URL}/registros/crear`, data, this.getHeaders());
    console.log('📡 [DESPUÉS DE HTTP POST] solicitud creada:', req);
    return req;
  }

  obtenerRegistros(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/registros/listar`, this.getHeaders());
  }

  crearUsuario(data: any): Observable<any> {
    return this.http.post(`${API_URL}/usuarios/crear`, data);
  }

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/usuarios/listar`, this.getHeaders());
  }
}
