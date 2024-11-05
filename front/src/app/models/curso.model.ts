import { Alumno } from "./alumno.model";
import { Docente } from "./docente.model";
import { Tema } from "./tema.model";

export class Curso {
    constructor(){
        this.id=0;
        this.fechaFin=new Date();
        this.fecha_inicio=new Date();
        this.precio=0;
        this.tema=new Tema();
        this.docente=new Docente();
        this.alumnos=[];
    }

    id:number;
    fechaFin:Date;
    fecha_inicio:Date;
    precio:number;
    tema:Tema ; 
    docente: Docente;
    alumnos: Alumno[];


}
