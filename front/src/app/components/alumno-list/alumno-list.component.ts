import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumno.model';
import { AlumnoService } from '../../services/alumno.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-alumno-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './alumno-list.component.html',
  styleUrl: './alumno-list.component.css'
})
export class AlumnoListComponent implements OnInit {
  alumnos: Alumno[] = [];

  constructor(private alumnoService: AlumnoService, private router: Router) { }

  ngOnInit(): void {
    this.cargarAlumnos();}

  cargarAlumnos(): void {
    this.alumnoService.getAll().subscribe(data => {
      this.alumnos = data;
    });
  }

  eliminarAlumno(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
      this.alumnoService.eliminarAlumno(id).subscribe(() => {
        this.alumnos = this.alumnos.filter(alumno => alumno.id !== id);
        this.router.navigate(['/alumnos']);
        
      });
    }
  } 

}