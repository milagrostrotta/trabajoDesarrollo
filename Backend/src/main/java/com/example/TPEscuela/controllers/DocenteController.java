package com.example.TPEscuela.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.TPEscuela.models.Alumno;
import com.example.TPEscuela.models.Curso;
import com.example.TPEscuela.models.Docente;
import com.example.TPEscuela.services.CursoService;
import com.example.TPEscuela.services.DocenteService;


@RestController
@RequestMapping("api/docentes")
@CrossOrigin(origins = "http://localhost:4200") // Permitir CORS para este controlador

public class DocenteController {
	@Autowired
	private DocenteService docenteService;
	 @Autowired
	 private CursoService cursoService;

	@GetMapping
	public ArrayList<Docente> getDocentes() { 
		return this.docenteService.getDocentes();
	}
	
	@PostMapping 
	public Docente saveDocente(@RequestBody Docente docente) {
		return this.docenteService.saveDocente(docente);
	}
	
	@GetMapping(path="/{id}")
	public Optional<Docente> getDocenteById(@PathVariable("id") Long id){
		return this.docenteService.getById(id);
	} 
	
	 @DeleteMapping(path = "/{id}")
	    public ResponseEntity<Map<String, String>> deleteById(@PathVariable("id") Long id) {
	        boolean ok = this.docenteService.deleteDocente(id);
	        
	        Map<String, String> response = new HashMap<>();
	        if (ok) {
	            response.put("mensaje", "Docente con id " + id + " eliminado");
	            return ResponseEntity.ok(response);
	        } else {
	            response.put("error", "Error al eliminar el docente con id " + id);
	            return ResponseEntity.status(500).body(response); // Código de error HTTP 500
	        }
	    }
	

    @PutMapping("/{id}")
	 public ResponseEntity<Docente> updateDocente(@PathVariable Long id, @RequestBody Docente docenteDetails) {
	        Optional<Docente> docente = docenteService.getById(id);
	        if (docente.isPresent()) {
	        	Docente docenteToUpdate = docente.get();
	            docenteToUpdate.setNombre(docenteDetails.getNombre());
	            docenteToUpdate.setLegajo(docenteDetails.getLegajo());
	            Docente updatedDocente = docenteService.saveDocente(docenteToUpdate);
	            return ResponseEntity.ok(updatedDocente);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
   
    
   
    @GetMapping("/{id}/cursosVigentes/alumnos")
    public ResponseEntity<List<Map<String, Object>>> getAlumnosDeCursosVigentes(@PathVariable("id") Long docenteId) {
        List<Map<String, Object>> cursosConAlumnos = cursoService.getCursosVigentesConAlumnos(docenteId);

        if (cursosConAlumnos.isEmpty()) {
            return ResponseEntity.noContent().build();  // No hay alumnos en los cursos vigentes
        } else {
            return ResponseEntity.ok(cursosConAlumnos);  // Devolver lista de alumnos por curso
        }
    }
    
    
	
}