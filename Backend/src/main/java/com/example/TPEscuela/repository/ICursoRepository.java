package com.example.TPEscuela.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.TPEscuela.models.Alumno;
import com.example.TPEscuela.models.Curso;

 
@Repository 
public interface ICursoRepository extends JpaRepository<Curso, Long> {
    List<Curso> findByFechaFin(LocalDate fechaFin); // Cambia a camelCase
    List<Curso> findByDocenteIdAndFechaFinAfter(Long docenteId, LocalDate fechaActual);
}
