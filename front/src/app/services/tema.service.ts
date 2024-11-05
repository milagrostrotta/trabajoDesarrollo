import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tema } from '../models/tema.model';
const baseUrl = 'http://localhost:8088/api/temas';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }
  public obtenerTemas(): Observable<Tema[]> {
    return this.http.get<Tema[]>(baseUrl);
  }


  crearTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>(`${baseUrl}`, tema);
  }

  obtenerTemaPorId(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${baseUrl}/${id}`);
  }

  actualizarTema(tema: Tema): Observable<void> {
    return this.http.put<void>(`${baseUrl}/${tema.id}`, tema);
  }
  
  eliminarTema(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/${id}`);
  }


}
