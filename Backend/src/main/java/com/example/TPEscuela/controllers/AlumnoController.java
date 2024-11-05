package com.example.TPEscuela.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
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
import org.springframework.web.bind.annotation.RestController;

import com.example.TPEscuela.models.Alumno;
import com.example.TPEscuela.models.Curso;
import com.example.TPEscuela.services.AlumnoService;
import com.example.TPEscuela.services.CursoService;

@RestController
@RequestMapping("/api/alumnos")
@CrossOrigin(origins = "http://localhost:4200") // Permitir CORS para este controlador

public class AlumnoController {

	
	@Autowired
	private AlumnoService alumnoService;
	
	@Autowired
	private CursoService cursoService;
	
	@GetMapping
	public ArrayList<Alumno> getAlumnos() { 
		return this.alumnoService.getAlumnos();
	}
	
	@PostMapping 
	public Alumno saveAlumno(@RequestBody Alumno Alumno) {
		return this.alumnoService.saveAlumno(Alumno);
	}
	
	@GetMapping(path="/{id}")
	public Optional<Alumno> getAlumnoById(@PathVariable("id") Long id){
		return this.alumnoService.getById(id);
	} 
	 @DeleteMapping(path = "/{id}")
	    public ResponseEntity<Map<String, String>> deleteById(@PathVariable("id") Long id) {
	        boolean ok = this.alumnoService.deleteAlumno(id);
	        
	        Map<String, String> response = new HashMap<>();
	        if (ok) {
	            response.put("mensaje", "Alumno con id " + id + " eliminado");
	            return ResponseEntity.ok(response);
	        } else {
	            response.put("error", "Error al eliminar el alumno con id " + id);
	            return ResponseEntity.status(500).body(response); // Código de error HTTP 500
	        }
	    }
	

    @PutMapping("/{id}")
	 public ResponseEntity<Alumno> updateAlumno(@PathVariable Long id, @RequestBody Alumno AlumnoDetails) {
	        Optional<Alumno> alumno = alumnoService.getById(id);
	        if (alumno.isPresent()) {
	        	Alumno AlumnoToUpdate = alumno.get();
	            AlumnoToUpdate.setNombre(AlumnoDetails.getNombre());
	            AlumnoToUpdate.setFechaNacimiento(AlumnoDetails.getFechaNacimiento());
	            Alumno updatedAlumno = alumnoService.saveAlumno(AlumnoToUpdate);
	            return ResponseEntity.ok(updatedAlumno);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }



	
}
