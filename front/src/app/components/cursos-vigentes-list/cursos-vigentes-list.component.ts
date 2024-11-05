import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../services/curso.service';
import { Alumno } from '../../models/alumno.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Docente } from '../../models/docente.model';
import { DocenteService } from '../../services/docente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos-vigentes-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cursos-vigentes-list.component.html',
  styleUrl: './cursos-vigentes-list.component.css'
})
export class CursosVigentesListComponent implements OnInit {
  alumnos: Alumno[] = [];
  docentes: Docente[] = [];
  selectedLegajo:number= 0;
  constructor(private cursoService: CursoService, private docenteService: DocenteService) {}

  ngOnInit(): void {
    this.cargarDocentes();
  }

  cargarDocentes(): void {
    this.docenteService.obtenerDocentes().subscribe((docentes: Docente[]) => {
      this.docentes = docentes;
    });
  }

  obtenerAlumnosCursosVigentesDeDocente(id: number): void {
    this.docenteService.obtenerAlumnosCursosVigentesDeDocente(id).subscribe((data: Alumno[]) => {
      this.selectedLegajo = id;
      console.log('legajo seleccionado',this.selectedLegajo);
      this.alumnos = data;
      console.log('Alumnos obtenidos para el docente con ID', id, ':', this.alumnos); // Console log

    });
  }
}  ///// arreglar manejo de lo que realmente devuelve (array de alumnos y  curso id)