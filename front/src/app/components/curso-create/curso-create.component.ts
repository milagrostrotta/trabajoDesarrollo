import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../services/curso.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Curso } from '../../models/curso.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Tema } from '../../models/tema.model';
import { Alumno } from '../../models/alumno.model';
import { Docente } from '../../models/docente.model';
import { DocenteService } from '../../services/docente.service';
import { TemaService } from '../../services/tema.service';
import { AlumnoService } from '../../services/alumno.service';

@Component({
  selector: 'app-curso-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './curso-create.component.html',
  styleUrls: ['./curso-create.component.css']
})
export class CursoCreateComponent implements OnInit {
  curso: Curso = new Curso();
  temas: Tema[] = [];
  docentes: Docente[] = [];
  alumnos: Alumno[] = [];
  editing: boolean = false; // Variable para determinar si estamos en modo edición

  constructor(
    private cursoService: CursoService,
    private docenteService: DocenteService,
    private temaService: TemaService,
    private alumnoService: AlumnoService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }
ngOnInit(): void {
  this.cargarAlumnos();
  this.cargarDocentes();
  this.cargarTemas();

  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.editing = true;

    this.cursoService.obtenerCursoPorId(Number(id)).subscribe((curso) => {
      this.curso.tema = this.temas.find(tema => tema.id === curso.tema.id)!;
      this.curso.docente = this.docentes.find(docente => docente.legajo === curso.docente.legajo)!;
      this.curso.fechaFin = curso.fechaFin;
      this.curso.fecha_inicio = curso.fecha_inicio;
      this.curso.precio = curso.precio;
      this.curso.id = curso.id;
      this.curso.alumnos=curso.alumnos;

    
    });
  }
}

  crearCurso(): void {
    if (this.curso.docente?.id === 0 || this.curso.tema.id===0) {
      console.error('Debe seleccionar un docente válido');
      return;
  }
   

    this.cursoService.create(this.curso).subscribe(() => {
      this.router.navigate(['/cursos']);
    });
  }

  actualizarCurso(): void {
      this.cursoService.actualizarCurso(this.curso.id, this.curso).subscribe(() => {
        console.log(this.curso);
        
        this.router.navigate(['/cursos']);
      })}
  

  cancelar(): void {
    this.router.navigate(['/cursos']);
  }

  cargarTemas(): void {
    this.temaService.obtenerTemas().subscribe((temas: Tema[]) => {
      this.temas = temas;
    });
  }

  cargarDocentes(): void {
    this.docenteService.obtenerDocentes().subscribe((docentes: Docente[]) => {
      this.docentes = docentes;
    });
  }

  cargarAlumnos(): void {
    this.alumnoService.getAll().subscribe((alumnos: Alumno[]) => {
      this.alumnos = alumnos;
    
    });
  }

  onAlumnoSelectionChange(event: Event, alumno: Alumno): void {
    const checkbox = event.target as HTMLInputElement;
  
    if (checkbox.checked) {
      if (!this.curso.alumnos.some(a => a.id === alumno.id)) {
        this.curso.alumnos.push(alumno);
      }
    } else {
      this.curso.alumnos = this.curso.alumnos.filter(a => a.id !== alumno.id);
    }
      alumno.selected = checkbox.checked;
  }

  
  onSubmit(cursoForm: NgForm) {
    
    if (cursoForm.invalid) {
      alert("Por favor, complete todos los campos obligatorios correctamente.");
      return;
    }
  
    if (this.curso.fechaFin <= this.curso.fecha_inicio) {
      alert("La fecha de fin debe ser posterior a la fecha de inicio.");
      return;
    }
  
    if (this.curso.precio <= 0) {
      alert("El precio del curso debe ser mayor que cero.");
      return;
    }
  
   
    if (this.curso.docente?.id === 0 || this.curso.tema.id===0) {
            alert("El tema y el docente deben ser diferentes.");
      return;
    }
  
    console.log("Formulario enviado exitosamente", this.curso);
    alert("Curso creado/actualizado con éxito.");

    if (this.editing){
      this.actualizarCurso()
    }else { 
      this.crearCurso()
    }
  }
  
  
}
