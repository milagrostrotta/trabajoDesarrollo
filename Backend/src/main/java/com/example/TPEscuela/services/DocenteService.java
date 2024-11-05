package com.example.TPEscuela.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.TPEscuela.models.Alumno;
import com.example.TPEscuela.models.Curso;
import com.example.TPEscuela.models.Docente;
import com.example.TPEscuela.repository.IDocenteRepository;

@Service
public class DocenteService {
	@Autowired
	IDocenteRepository docenteRepository;
	
	public Optional<Docente> getById(Long id){
		return docenteRepository.findById(id);	
	}
	
	public ArrayList<Docente>  getDocentes(){
		return (ArrayList<Docente>) docenteRepository.findAll();
	}
	
	public Docente saveDocente(Docente user) {
		return docenteRepository.save(user);
	}
	
	public Boolean deleteDocente(Long id) {
		try {
			docenteRepository.deleteById(id);
			return true;
		}catch (Exception e) {
			return false;
		}
	}
	
	public Docente updateById(Docente request, Long id){
		Docente docente=docenteRepository.findById(id).get();
		
		docente.setNombre(request.getNombre());
		docente.setLegajo(request.getLegajo());

		
		return docente;
	
}
	//
	/*public Docente partialUpdateDocente(Long id, Map<String, Object> updates) {
	        Optional<Docente> docenteOptional = docenteRepository.findById(id);
	        
	        if (docenteOptional.isPresent()) {
	            Docente docenteToUpdate = docenteOptional.get();

	            updates.forEach((key, value) -> {
	                switch (key) {
	                    case "nombre":
	                        docenteToUpdate.setNombre((String) value);
	                        break;
	                    case "legajo":
	                        docenteToUpdate.setLegajo(Long.valueOf(value.toString()));
	                        break;
	                    case "cursos":
	                        // Aquí podrías agregar lógica para actualizar la lista de cursos,
	                        // dependiendo de cómo desees manejar la relación
	                        // Por ejemplo, podrías asignar nuevos cursos al docente aquí
	                        docenteToUpdate.setCursos((List<Curso>) value);
	                        break;
	                }
	            });

	            return docenteRepository.save(docenteToUpdate); // Guardar el docente actualizado
	        } else {
	            return null; // O lanzar una excepción si el docente no existe
	        }
	    }

	public List<Curso> getCursosDocente(Long id) {
	    Optional<Docente> optionalDocente = docenteRepository.findById(id);
	    if (optionalDocente.isPresent()) {
	        return optionalDocente.get().getCursos();
	    } else {
	        return new ArrayList<>(); // o lanzar una excepción si lo prefieres
	    }
	}
	
	public List<Curso> getCursosVigentesDocente(Long id) {
	    Optional<Docente> optionalDocente = docenteRepository.findById(id);
	    if (optionalDocente.isPresent()) {
	        List<Curso> cursos = optionalDocente.get().getCursos();
	        // Filtrar cursos cuya fecha de fin es después de la fecha actual
	        return cursos.stream()
	                     .filter(curso -> curso.getFechaFin().isAfter(LocalDate.now()))
	                     .collect(Collectors.toList());
	    }
	    return null; // O puedes devolver una lista vacía
	}
	
	  public List<List<Alumno>> getAlumnosCursosVigentesDocente(Long id) {
	        List<Curso> cursosVigentes = getCursosVigentesDocente(id);
	        
	        List<List<Alumno>> alumnosPorCurso = new ArrayList<>();
	        for (Curso curso : cursosVigentes) {
	            // Asumiendo que Curso tiene un método getAlumnos()
	            if (curso.getAlumnos() != null) {
	                alumnosPorCurso.add(curso.getAlumnos());
	            } else {
	                alumnosPorCurso.add(new ArrayList<>()); // Agrega una lista vacía si no hay alumnos
	            }
	        }
	        return alumnosPorCurso;
	    }*/
}