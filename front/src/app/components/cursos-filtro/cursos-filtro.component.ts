import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cursos-filtro',
  standalone: true,
  imports: [],
  templateUrl: './cursos-filtro.component.html',
  styleUrl: './cursos-filtro.component.css'
})
export class CursosFiltroComponent {
  @Output() fechaSeleccionada = new EventEmitter<Date>();

  onFechaChange(event: Event): void {
    const target = event.target as HTMLInputElement; // Casting a HTMLInputElement
    if (target.value) { // Verifica que el valor no sea nulo
      this.fechaSeleccionada.emit(new Date(target.value));
      
    }
  }
}
