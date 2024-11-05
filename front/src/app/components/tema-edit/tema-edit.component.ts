import { Component } from '@angular/core';
import { Tema } from '../../models/tema.model';
import { TemaService } from '../../services/tema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tema-edit',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './tema-edit.component.html',
  styleUrl: './tema-edit.component.css'
})
export class TemaEditComponent {
  tema: Tema; // Cambia 'Alumno' por el tipo real de 'alumno'
  id: number | undefined;
  
  constructor(
    private temaService: TemaService,
    private route: ActivatedRoute,

    private router: Router
  ) {
    this.tema = {id:0,nombre: '', descripcion:''}; // Inicializa el alumno
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!; // Obtén el ID de los parámetros de la ruta
    this.obtenerTema(this.id);
  }

  obtenerTema(id: number): void {
    this.temaService.obtenerTemaPorId(id).subscribe((data: Tema) => {
      this.tema = data; // Asigna los datos del alumno a la variable
    });
  }

  guardarCambios(): void {
    this.temaService.actualizarTema(this.tema).subscribe(() => {
      this.router.navigate(['/temas']); // Redirige a la lista de alumnos después de guardar
    });
  }
}

