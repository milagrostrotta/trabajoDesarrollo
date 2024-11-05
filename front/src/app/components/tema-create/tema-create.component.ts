import { Component } from '@angular/core';
import { TemaService } from '../../services/tema.service';
import { Router } from '@angular/router';
import { Tema } from '../../models/tema.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tema-create',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './tema-create.component.html',
  styleUrl: './tema-create.component.css'
})
export class TemaCreateComponent {
  tema: Tema = new Tema();

  constructor(private temaService: TemaService, private router: Router) {}

  crearTema(): void {
    this.temaService.crearTema(this.tema).subscribe(() => {
      this.router.navigate(['/temas']);
    });
  }


}
