package com.example.TPEscuela.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.TPEscuela.models.Alumno;
import com.example.TPEscuela.models.Curso;
import com.example.TPEscuela.models.Docente;
import com.example.TPEscuela.models.Tema;
import com.example.TPEscuela.services.CursoService;
import com.example.TPEscuela.services.DocenteService;
import com.example.TPEscuela.services.TemaService;
@RestController
@RequestMapping("api/cursos")
@CrossOrigin(origins = "http://localhost:4200") // Permitir CORS para este controlador

public class CursoController {

	@Autowired
	private CursoService cursoService;

	@Autowired
	private TemaService temaService;

	@Autowired
	private DocenteService docenteService;
	@GetMapping
	public ArrayList<Curso> getCursos() { 
		return this.cursoService.getCursos();
	}
	
	@PostMapping 
	public ResponseEntity<?> saveCurso(@RequestBody Curso curso) {
	    try {
	        Curso savedCurso = cursoService.saveCurso(curso);
	        return ResponseEntity.ok(savedCurso);
	    } catch (RuntimeException e) {
	        return ResponseEntity.badRequest().body("Error: " + e.getMessage());
	    }
	}

	
	@GetMapping(path="/{id}")
	public Optional<Curso> getCursoById(@PathVariable("id") Long id){
		return this.cursoService.getById(id);
	} 
	
	  @DeleteMapping(path = "/{id}")
	    public ResponseEntity<Map<String, String>> deleteById(@PathVariable("id") Long id) {
	        boolean ok = this.cursoService.deleteCurso(id);
	        Map<String, String> response = new HashMap<>();

	        if (ok) {
	            response.put("message", "Curso con id " + id + " eliminado");
	            return ResponseEntity.ok(response); // Devuelve 200 OK
	        } else {
	            response.put("error", "Error al eliminar el curso");
	            return ResponseEntity.status(400).body(response); // Devuelve 400 Bad Request
	        }
	    }

    @PutMapping("/{id}")
	 public ResponseEntity<Curso> updateCurso(@PathVariable Long id, @RequestBody Curso cursoDetails) {
	        Optional<Curso> curso = cursoService.getById(id);
	        if (curso.isPresent()) {
	        	Curso cursoToUpdate = curso.get();
	            cursoToUpdate.setFecha_inicio(cursoDetails.getFecha_inicio());
	            cursoToUpdate.setFechaFin(cursoDetails.getFechaFin());
	            cursoToUpdate.setPrecio(cursoDetails.getPrecio());
	            cursoToUpdate.setDocente(cursoDetails.getDocente());
	            cursoToUpdate.setTema(cursoDetails.getTema());
	            cursoToUpdate.setAlumnos(cursoDetails.getAlumnos());
	            Curso updatedCurso = cursoService.saveCurso(cursoToUpdate);
	            return ResponseEntity.ok(updatedCurso);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
    
   
 
    
    //Obtener los cursos que terminan un dia determinado
    
    @GetMapping("/fecha-fin")
    public  ResponseEntity<List<Curso>> getCursosByFechaFin(@RequestParam(value = "fechaFin", required = true) String fechaFin) {
        List<Curso> cursos;

        if (fechaFin != null) {
            LocalDate localDate = LocalDate.parse(fechaFin);
            cursos = cursoService.getByFecha_fin(localDate);
        } else {
            cursos = cursoService.getCursos();
        }

        return ResponseEntity.ok(cursos);
    }
    ///http://localhost:8083/api/cursos/fecha-fin?fechaFin=2024-12-01
    
  

}

