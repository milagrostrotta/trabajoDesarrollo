import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AlumnoListComponent } from './components/alumno-list/alumno-list.component';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { DocenteListComponent } from './components/docente-list/docente-list.component';
import { AlumnoCreateComponent } from './components/alumno-create/alumno-create.component';
import { AlumnoEditComponent } from './components/alumno-edit/alumno-edit.component';
import { CursoCreateComponent } from './components/curso-create/curso-create.component';
import { DocenteEditComponent } from './components/docente-edit/docente-edit.component';
import { DocenteCreateComponent } from './components/docente-create/docente-create.component';
import { TemaCreateComponent } from './components/tema-create/tema-create.component';
import { CursosVigentesListComponent } from './components/cursos-vigentes-list/cursos-vigentes-list.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink,RouterOutlet, AlumnoListComponent, CursoListComponent,DocenteListComponent, AlumnoCreateComponent, AlumnoEditComponent,CursoCreateComponent,DocenteEditComponent,DocenteCreateComponent,TemaCreateComponent,CursosVigentesListComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrige styleUrl a styleUrls
})
export class AppComponent {
  title = 'front';
}


