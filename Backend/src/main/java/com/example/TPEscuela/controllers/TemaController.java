package com.example.TPEscuela.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.TPEscuela.models.Tema;
import com.example.TPEscuela.services.TemaService;

@RestController
@RequestMapping("/api/temas")
@CrossOrigin(origins = "http://localhost:4200") // Permitir CORS para este controlador

public class TemaController {

	@Autowired
	private TemaService temaService;
	

	@GetMapping
	public ArrayList<Tema> getTemas() { 
		return this.temaService.getTemas();
	}
	
	@PostMapping 
	public Tema saveTema(@RequestBody Tema Tema) {
		return this.temaService.saveTema(Tema);
	}
	
	@GetMapping(path="/{id}")
	public Optional<Tema> getTemaById(@PathVariable("id") Long id){
		return this.temaService.getById(id);
	} 

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Map<String, String>> deleteById(@PathVariable("id") Long id) {
        boolean ok = this.temaService.deleteTema(id);
        Map<String, String> response = new HashMap<>();

        if (ok) {
            response.put("message", "Tema con id " + id + " eliminado");
            return ResponseEntity.ok(response); // Devuelve 200 OK
        } else {
            response.put("error", "Error al eliminar el tema");
            return ResponseEntity.status(400).body(response); // Devuelve 400 Bad Request
        }
    }

    @PutMapping("/{id}")
	 public ResponseEntity<Tema> updateTema(@PathVariable Long id, @RequestBody Tema temaDetails) {
	        Optional<Tema> tema = temaService.getById(id);
	        if (tema.isPresent()) {
	        	Tema temaToUpdate = tema.get();
	            temaToUpdate.setNombre(temaDetails.getNombre());
	            temaToUpdate.setDescripcion(temaDetails.getDescripcion());
	            Tema updatedTema = temaService.saveTema(temaToUpdate);
	            return ResponseEntity.ok(updatedTema);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
}
