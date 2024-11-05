import { Component } from '@angular/core';
import { TemaService } from '../../services/tema.service';
import { Tema } from '../../models/tema.model';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tema-list',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './tema-list.component.html',
  styleUrl: './tema-list.component.css'
})
export class TemaListComponent {
  temas: Tema[] = [];


  constructor(private temaService: TemaService, private router:Router) { }

  ngOnInit(): void {
    this.getTemas();
  }

  getTemas(): void {
    this.temaService.obtenerTemas().subscribe((data: Tema[]) => {
      this.temas = data;
    });
  }
  eliminarTema(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este tema?')) {
      this.temaService.eliminarTema(id).subscribe(() => {
        this.temas = this.temas.filter(doc => doc.id !== id);
        this.router.navigate(['/temas']);
        
      });
    }
  } 
}
