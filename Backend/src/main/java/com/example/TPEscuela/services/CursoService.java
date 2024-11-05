package com.example.TPEscuela.services;
import java.util.Date;
import java.util.HashMap;
import java.time.LocalDate; 
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.TPEscuela.models.Curso;
import com.example.TPEscuela.models.Docente;
import com.example.TPEscuela.models.Tema;
import com.example.TPEscuela.models.Alumno;
import com.example.TPEscuela.repository.ICursoRepository;
import com.example.TPEscuela.repository.IDocenteRepository;
import com.example.TPEscuela.repository.ITemaRepository;
@Service
public class CursoService {
	@Autowired
	ICursoRepository cursoRepository;
	@Autowired
	IDocenteRepository docenteRepository;
	@Autowired
	TemaService temaService;
	@Autowired
	AlumnoService alumnoService;
	
	public Optional<Curso> getById(Long id){
		return cursoRepository.findById(id);	
	}
	
	
	public ArrayList<Curso>  getCursos(){
		return (ArrayList<Curso>) cursoRepository.findAll();
	}
	
	public Curso saveCurso(Curso curso) {
	    List<Alumno> alumnos = new ArrayList<>();

	    if (curso.getAlumnos() != null) {
	        for (Alumno alumnoRequest : curso.getAlumnos()) {
	            Optional<Alumno> alumnoOptional = alumnoService.getById(alumnoRequest.getId());

	            if (alumnoOptional.isPresent()) {
	                alumnos.add(alumnoOptional.get());
	            } else {
	                throw new RuntimeException("Alumno con ID " + alumnoRequest.getId() + " no encontrado.");
	            }
	        }
	    }

	    curso.setAlumnos(alumnos);

	    return cursoRepository.save(curso);
	}

	public Boolean deleteCurso(Long id) {
		try {
			cursoRepository.deleteById(id);
			return true;
		}catch (Exception e) {
			return false;
		}
	}
	
	public ArrayList<Curso> getByFecha_fin(LocalDate fecha_fin){ 
		return (ArrayList<Curso>) cursoRepository.findByFechaFin(fecha_fin);
	}


    public List<Map<String, Object>> getCursosVigentesConAlumnos(Long docenteId) {
        // Obtener la fecha actual
        LocalDate fechaActual = LocalDate.now();
        // Obtener los cursos vigentes usando el método del repositorio
        List<Curso> cursosVigentes = cursoRepository.findByDocenteIdAndFechaFinAfter(docenteId, fechaActual);

        return cursosVigentes.stream().map(curso -> {
            Map<String, Object> cursoMap = new HashMap<>();
            cursoMap.put("cursoId", curso.getId());
            cursoMap.put("alumnos", curso.getAlumnos());
            return cursoMap;
        }).collect(Collectors.toList());
    }
}
