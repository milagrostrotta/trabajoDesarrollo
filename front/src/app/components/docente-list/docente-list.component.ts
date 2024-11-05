import { Component, OnInit } from '@angular/core';
import { Docente } from '../../models/docente.model';
import { DocenteService } from '../../services/docente.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-docente-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './docente-list.component.html',
  styleUrl: './docente-list.component.css'
})
export class DocenteListComponent implements OnInit {

  docentes: Docente[] = [];

  constructor(private docenteService: DocenteService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerDocentes();
  }

  obtenerDocentes(): void {
    this.docenteService.obtenerDocentes().subscribe((data: Docente[]) => {
      this.docentes = data;
    });
  }

  eliminarDocente(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
      this.docenteService.eliminarDocente(id).subscribe(() => {
        // Actualizamos la lista localmente al eliminar el alumno
        this.docentes = this.docentes.filter(doc => doc.id !== id);
        this.router.navigate(['/docentes']);
        
      });
    }
  } 
}