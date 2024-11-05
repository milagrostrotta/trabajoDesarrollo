import { Component, OnInit } from '@angular/core';
import { Curso } from '../../models/curso.model';
import { CursoService } from '../../services/curso.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CursoCreateComponent } from '../curso-create/curso-create.component';
import { CursosFiltroComponent } from "../cursos-filtro/cursos-filtro.component";

@Component({
  selector: 'app-curso-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CursoCreateComponent, CursosFiltroComponent],
  templateUrl: './curso-list.component.html',
  styleUrl: './curso-list.component.css'
})
export class CursoListComponent implements OnInit {

  cursos: Curso[] = [];
  filteredCursos: Curso[] = [];

  constructor(private cursoService: CursoService,private router: Router) { }

  ngOnInit(): void {
    this.getCursos();
  }

  getCursos(): void {
    this.cursoService.getAll().subscribe((data: Curso[]) => {
      this.cursos = data;
    });
  }
  eliminarCurso(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      this.cursoService.eliminarCurso(id).subscribe(() => {
        this.getCursos(); 
      });
    }
  }

  filtrarCursos(fecha: Date): void {
    console.log('Fecha seleccionada para filtrar:', fecha); 
    this.cursoService.getCursosByFechaFin(fecha).subscribe({
      next: (data: Curso[]) => {
        this.cursos = data; 
        console.log('Cursos filtrados:', data); 
       
      },
      error: (err) => {
        console.error('Error al obtener cursos filtrados:', err); 
      }
    })}

  }
  
  