import { Component } from '@angular/core';
import { Docente } from '../../models/docente.model';
import { DocenteService } from '../../services/docente.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-docente-create',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './docente-create.component.html',
  styleUrl: './docente-create.component.css'
})
export class DocenteCreateComponent {
  docente: Docente = new Docente();

  constructor(private docenteService: DocenteService, private router: Router) {}

  crearDocente(): void {
    this.docenteService.crearDocente(this.docente).subscribe(() => {
      this.router.navigate(['/docentes']);
    });
  }

}
