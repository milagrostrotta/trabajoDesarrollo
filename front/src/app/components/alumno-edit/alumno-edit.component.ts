import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumno.model';
import { AlumnoService } from '../../services/alumno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-alumno-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './alumno-edit.component.html',
  styleUrl: './alumno-edit.component.css'
})

  export class AlumnoEditComponent implements OnInit {
    alumno: Alumno; // Cambia 'Alumno' por el tipo real de 'alumno'
    id: number | undefined;
  
    constructor(
      private alumnoService: AlumnoService,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.alumno = {id:0,nombre: '', fechaNacimiento: new Date() }; // Inicializa el alumno
    }
  
    ngOnInit(): void {
      this.id = +this.route.snapshot.paramMap.get('id')!; // Obtén el ID de los parámetros de la ruta
      this.obtenerAlumno(this.id);
      
    }
  
    obtenerAlumno(id: number): void {
      this.alumnoService.obtenerAlumnoPorId(id).subscribe((data: Alumno) => {
        this.alumno = data; // Asigna los datos del alumno a la variable
      });
    }
  
    guardarCambios(): void {
      this.alumnoService.actualizarAlumno(this.alumno).subscribe(() => {
        this.router.navigate(['/alumnos']); // Redirige a la lista de alumnos después de guardar
      });
    }
  }