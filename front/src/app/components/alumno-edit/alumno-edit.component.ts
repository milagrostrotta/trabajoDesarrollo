import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumno.model';
import { AlumnoService } from '../../services/alumno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-alumno-edit',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './alumno-edit.component.html',
  styleUrl: './alumno-edit.component.css'
})

  export class AlumnoEditComponent implements OnInit {
    alumno: Alumno = new Alumno(); 
    id: number | undefined;

    constructor(
      private alumnoService: AlumnoService,
      private route: ActivatedRoute,
      private router: Router
    ) {
    }
  
    ngOnInit(): void {
      this.id = +this.route.snapshot.paramMap.get('id')!; 
      this.obtenerAlumno(this.id);
      
    }
  
    obtenerAlumno(id: number): void {
      this.alumnoService.obtenerAlumnoPorId(id).subscribe((data: Alumno) => {
        this.alumno = data; 
      });
    }
  
    guardarCambios(): void {
      this.alumnoService.actualizarAlumno(this.alumno).subscribe(() => {
        this.router.navigate(['/alumnos']);
      });
    }
  }