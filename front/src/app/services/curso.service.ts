import { Injectable } from '@angular/core';
import { Curso } from '../models/curso.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Alumno } from '../models/alumno.model';
const baseUrl = 'http://localhost:8088/api/cursos';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private http: HttpClient) { }
  public getAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(baseUrl);
  }
  create(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${baseUrl}`, curso);
  }

  obtenerCursoPorId(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${baseUrl}/${id}`);
  }

  actualizarCurso(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${baseUrl}/${id}`, curso);
  }
  
  eliminarCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/${id}`);
  }
  


  getCursosByFechaFin(fecha: Date): Observable<Curso[]> {
   

    const fechaStr = fecha.toISOString().split('T')[0];
    const url=`${baseUrl}/fecha-fin?fechaFin=${fechaStr}`;
    ; // Convertir la fecha a formato 'YYYY-MM-DD'
    return this.http.get<Curso[]>(url);
    console.log('URL de solicitud:', url); // Log de la URL

  }

}
