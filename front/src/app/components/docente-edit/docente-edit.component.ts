import { Component } from '@angular/core';
import { Docente } from '../../models/docente.model';
import { DocenteService } from '../../services/docente.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-docente-edit',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterLink],
  templateUrl: './docente-edit.component.html',
  styleUrl: './docente-edit.component.css'
})
export class DocenteEditComponent {
  docente: Docente; // Cambia 'Alumno' por el tipo real de 'alumno'
    id: number | undefined;
  legajo:number | undefined;
    constructor(
      private docenteService: DocenteService,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.docente = {id:0,nombre: '', legajo: 0}; // Inicializa el alumno
    }
  
    ngOnInit(): void {
      this.id = +this.route.snapshot.paramMap.get('id')!; // Obtén el ID de los parámetros de la ruta
      this.obtenerDocente(this.id);
    }
  
    obtenerDocente(id: number): void {
      this.docenteService.obtenerDocentePorId(id).subscribe((data: Docente) => {
        this.docente = data; // Asigna los datos del alumno a la variable
      });
    }
  
    guardarCambios(): void {
      this.docenteService.actualizarDocente(this.docente).subscribe(() => {
        this.router.navigate(['/docentes']); // Redirige a la lista de alumnos después de guardar
      });
    }
  }
