import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Alumno } from '../models/alumno.model';
const baseUrl = 'http://localhost:8088/api/alumnos';

@Injectable({
  providedIn: 'root'
})


export class AlumnoService {

  constructor(private http: HttpClient) { }
  public getAll(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(baseUrl);
  }

  create(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(`${baseUrl}`, alumno);
  }

  obtenerAlumnoPorId(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${baseUrl}/${id}`);
  }

  actualizarAlumno(alumno: Alumno): Observable<void> {
    return this.http.put<void>(`${baseUrl}/${alumno.id}`, alumno);
  }
  
  eliminarAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/${id}`);
  }
  
}
