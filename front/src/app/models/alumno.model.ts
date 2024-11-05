import { Curso } from "./curso.model";

export class Alumno {
    constructor() {
        this.id=0;
        this.nombre='';
        this.fechaNacimiento=new Date(); 
        this.selected=false;

    }
    id:number;
    nombre:string;
    fechaNacimiento:Date;
    selected?:boolean;
}
