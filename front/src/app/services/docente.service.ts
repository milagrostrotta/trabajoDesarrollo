import { Injectable } from '@angular/core';
import { Docente } from '../models/docente.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
const baseUrl = 'http://localhost:8088/api/docentes';


@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  constructor(private http: HttpClient) { }
  public obtenerDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(baseUrl);
  }

  crearDocente(docente: Docente): Observable<Docente> {
    return this.http.post<Docente>(`${baseUrl}`, docente);
  }

  obtenerDocentePorId(id: number): Observable<Docente> {
    return this.http.get<Docente>(`${baseUrl}/${id}`);
  }

  actualizarDocente(docente: Docente): Observable<void> {
    return this.http.put<void>(`${baseUrl}/${docente.id}`, docente);
  }
  
  eliminarDocente(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/${id}`);
  }
  obtenerAlumnosCursosVigentesDeDocente(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/${id}/cursosVigentes/alumnos`).pipe(
      map(response => {
        if (!response) {
          return []; // Retorna un array vacío si la respuesta es nula
        }
        return response.flatMap(curso => curso.alumnos); // Usa || [] para evitar errores
      }))
  }
  

}
