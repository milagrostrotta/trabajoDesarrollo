package com.example.TPEscuela.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.ManyToAny;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;



@Entity
@Table (name= "Curso")
public class Curso {


	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;
	
	@Column(name= "fecha_inicio")
	private LocalDate fecha_inicio;
	@Column(name= "fechaFin")
	private LocalDate fechaFin;
	
	@Column(name= "precio")
	private Double precio;
	////???///
	@ManyToOne
    @JoinColumn(name = "Tema_id", referencedColumnName = "id")
    private Tema tema;
//////////s////
	
	@ManyToOne
	@JoinColumn(name = "docente_id")
	private Docente docente;
	@ManyToMany
	@JoinTable(
	    name = "curso_alumno",  // Nombre de la tabla intermedia
	    joinColumns = @JoinColumn(name = "curso_id"),  // Columna del lado de curso
	    inverseJoinColumns = @JoinColumn(name = "alumno_id")  // Columna del lado de alumno
	)
	private List<Alumno> alumnos = new ArrayList<>();

    
    
	public Long getId() {
		return id;
	}

	public LocalDate getFecha_inicio() {
		return fecha_inicio;
	}


	public Double getPrecio() {
		return precio;
	}

	public Tema getTema() {
		return tema;
	}

	public Docente getDocente() {
		return docente;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setFecha_inicio(LocalDate fecha_inicio) {
		this.fecha_inicio = fecha_inicio;
	}


	public void setPrecio(Double precio) {
		this.precio = precio;
	}

	public void setTema(Tema tema) {
		this.tema = tema;
	}

	public void setDocente(Docente docente) {
		this.docente = docente;
	}

	public LocalDate getFechaFin() {
		return fechaFin;
	}

	public List<Alumno> getAlumnos() {
		return alumnos;
	}

	public void setFechaFin(LocalDate fechaFin) {
		this.fechaFin = fechaFin;
	}

	public void setAlumnos(List<Alumno> alumnos) {
		this.alumnos = alumnos;
	}
	
	
	
	
}
