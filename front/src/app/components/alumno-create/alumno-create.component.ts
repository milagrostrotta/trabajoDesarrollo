import { Component } from '@angular/core';
import { Alumno } from '../../models/alumno.model';
import { AlumnoService } from '../../services/alumno.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-alumno-create',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './alumno-create.component.html',
  styleUrls: ['./alumno-create.component.css'] 
})
export class AlumnoCreateComponent {
  alumno: Alumno = new Alumno();
  
  constructor(private alumnoService: AlumnoService, private router: Router) {

  }

  createAlumno(): void {
    if (this.alumno.nombre&&this.alumno.fechaNacimiento){
      console.log(this.alumno.nombre);
      console.log(this.alumno.fechaNacimiento);
      this.alumnoService.create(this.alumno).subscribe(() => {
        this.router.navigate(['/alumnos']);
      });
    }
    
  }
}
