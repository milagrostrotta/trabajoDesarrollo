import { Routes } from '@angular/router';
import { AlumnoListComponent } from './components/alumno-list/alumno-list.component';
import { AlumnoCreateComponent } from './components/alumno-create/alumno-create.component';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { DocenteListComponent } from './components/docente-list/docente-list.component';
import { TemaListComponent } from './components/tema-list/tema-list.component';
import { AlumnoEditComponent } from './components/alumno-edit/alumno-edit.component';
import { CursoCreateComponent } from './components/curso-create/curso-create.component';
import { DocenteCreateComponent } from './components/docente-create/docente-create.component';
import { DocenteEditComponent } from './components/docente-edit/docente-edit.component';
import { TemaCreateComponent } from './components/tema-create/tema-create.component';
import { TemaEditComponent } from './components/tema-edit/tema-edit.component';
import { CursosVigentesListComponent } from './components/cursos-vigentes-list/cursos-vigentes-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/cursos', pathMatch: 'full' }, // Redirige a la lista de alumnos por defecto
    { path: 'alumnos', component: AlumnoListComponent },
    { path: 'alumno-create', component: AlumnoCreateComponent },
    { path: 'cursos', component: CursoListComponent },
    {path:  'cursos/curso-create',component:CursoCreateComponent},
    {path:  'cursos/curso-edit/:id',component:CursoCreateComponent},
    { path: 'docentes', component: DocenteListComponent },
    { path: 'docentes/docente-create', component: DocenteCreateComponent },
    { path: 'docentes/docente-edit/:id', component: DocenteEditComponent },
    { path: 'temas', component: TemaListComponent },
    { path: 'temas/tema-create', component: TemaCreateComponent },
    { path: 'temas/tema-edit/:id', component: TemaEditComponent  },
    { path: 'alumno-edit/:id', component: AlumnoEditComponent },
    {path: 'cursosVigentes', component:CursosVigentesListComponent}
  ];