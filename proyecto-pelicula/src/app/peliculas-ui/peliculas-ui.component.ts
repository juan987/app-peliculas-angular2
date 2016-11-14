import { Component, OnInit } from '@angular/core';
import {PeliculaPojo} from '../modelo-datos/Pelicula-Pojo';
import {PeliculaPojo2} from '../modelo-datos/Pelicula-Pojo2';
import {ServicioPeliculasDaoService} from '../servicios/Servicio-Peliculas-Dao.Service';
import {ServicioHttpService} from '../servicios/Servicio-Http.Service';

// Add the RxJS Observable operators. para gestionar HTTP
import './rxjs-operators';


@Component({
  selector: 'app-peliculas-ui',
  templateUrl: './peliculas-ui.component.html',
  styleUrls: ['./peliculas-ui.component.css'],
  providers: [ServicioPeliculasDaoService, ServicioHttpService]
})


export class PeliculasUiComponent implements OnInit {

//Esta linea la quite del http
//[class.pruebaFilaClicked]="booleanFilaClicked"

//variables para http 
  errorMessage: string;
  pelisListHttp: PeliculaPojo[];
  pelisListHttp2: PeliculaPojo2[];
  mode = 'Observable';
//Fin de variables para http

  private peliculaPojo: PeliculaPojo;
  //private listaDePeliculas: PeliculaPojo[];
  //private servicioPeliculasDaoService: ServicioPeliculasDaoService;
  public booleanFilaClicked: boolean = false;

  //booleans para ordenar ascendente o descentente
  boolTitulo: boolean = true;
  boolDirector: boolean = true;
  boolFecha: boolean = true;
  boolValoracion: boolean = true;

  constructor(private servicioPeliculasDaoService: ServicioPeliculasDaoService,
              private servicioHttpService: ServicioHttpService) { 
    this.peliculaPojo = new PeliculaPojo("","","","","","");
    //this.listaDePeliculas = servicioPeliculasDaoService.getListaPeliculas();
    //this.servicioPeliculasDaoService = servicioPeliculasDaoService;
  }

  ngOnInit() {
    this.getPelisHttp();
  }

  clickEnFila(miFila: any): void{
    console.log("Has hecho click en una fila");
    this.booleanFilaClicked = true;
    //console.log("variable mi fila:    " +miFila[0].value)
    //console.log("variable mi fila:    " +miFila[0].text)
    //console.log("variable mi fila:    " +miFila[0].html)

    console.log("variable mi fila:    " +miFila.id)
    console.log("variable mi fila:    " +miFila.titulo)
    console.log("variable mi fila:    " +miFila.director)
    //this.peliculaPojo = miFila;
    this.peliculaPojo.setId(miFila.id);
    this.peliculaPojo.setTitulo(miFila.titulo);
    this.peliculaPojo.setDirector(miFila.director);
    this.peliculaPojo.setSinopsis(miFila.sinopsis);
    this.peliculaPojo.setFecha(miFila.fecha);
    this.peliculaPojo.setValoracion(miFila.valoracion);

  }

  clickGuardar(): void{
    console.log("Click en el boton guardar");
    this.addPeliHttp();
  }

  clickModificar(): void{
    console.log('Click en el boton modificar');
    this.modificarPeliHttp();
  }

  clickBorrar(): void{
    console.log('Click en el boton borrar');
    this.deletePeliHttp();
  }

  clickOrdenarTituloAscendente(): void{
    console.log('Click en columna titulo para ordenar');
    //this.pelisListHttp.sort(this.ordenarPorTituloAscendente);
    //this.pelisListHttp.sort();

    //He tenido que cambiar todas las properties de PeliculaPojo a public,
    //por que sort no reconocia los getters
    this.pelisListHttp.sort((a: PeliculaPojo, b: PeliculaPojo): number =>{
      console.log('a ver que es a:     ' +a.titulo);
      if (a.titulo < b.titulo)
        return -1;
      //if (a.getId() > b.getId())
      if (a.titulo > b.titulo)
        return 1;
      return 0;
    });
    
  }


//para coger los datos de las peliculas
  getDatos2(): PeliculaPojo[]{
    //return this.listaDePeliculas;

    //Con un servicio local
    return this.servicioPeliculasDaoService.getListaPeliculas();

    //Con el servicio http
    //return this.getPelisHttp();
  }


//Datos de la tabla pequeña
  getDatos(): Pelicula[]{
    return this.peliculasArray;
  }

  private peliculasArray: Pelicula[] = [
    { id: 1, titulo: 'Mr. Nice', director: 'juan miguel', sinopsis: 'animacion', clasificacion: 'buena' },
    { id: 2, titulo: 'Mr. Nice', director: 'juan miguel', sinopsis: 'animacion', clasificacion: 'buena' },
    { id: 3, titulo: 'Mr. Nice', director: 'juan miguel', sinopsis: 'animacion', clasificacion: 'buena' },
    { id: 4, titulo: 'Mr. Nice', director: 'juan miguel', sinopsis: 'animacion', clasificacion: 'buena' },
    { id: 5, titulo: 'Mr. Nice', director: 'juan miguel', sinopsis: 'animacion', clasificacion: 'buena' },
    { id: 6, titulo: 'Mr. Nice', director: 'juan miguel', sinopsis: 'animacion', clasificacion: 'buena' },
    { id: 7, titulo: 'Mr. Nice', director: 'juan miguel', sinopsis: 'animacion', clasificacion: 'buena' },
    { id: 8, titulo: 'Mr. Nice', director: 'juan miguel', sinopsis: 'animacion', clasificacion: 'buena' },
  ];
  //FIN Datos de la tabla pequeña


//Metodos relacionados con sort
/*
  ordenarPorTituloAscendente(a: PeliculaPojo, b:PeliculaPojo): number {
    //if (a.getId() < b.getId())
    if (a.getTitulo() < b.getTitulo())
      return -1;
    //if (a.getId() > b.getId())
    if (a.getTitulo() > b.getTitulo())
      return 1;
    return 0;
  }
  */

    ordenarPorTituloAscendente(a, b): number {
      //if (a.getId() < b.getId())
      if (a.getTitulo() < b.getTitulo())
        return -1;
      //if (a.getId() > b.getId())
      if (a.getTitulo() > b.getTitulo())
        return 1;
      return 0;
    }

//FIN de metodos relacionados con sort




//Metodos relacionados con http
  getPelisHttp() {
    this.servicioHttpService.getListaPeliculas()
                     .subscribe(
                       pelisListHttp => this.pelisListHttp = pelisListHttp,
                       //pelisListHttp => this.pelisListHttp = pelisListHttp.slice(0),
                       error =>  this.errorMessage = <any>error);
  }

  
  addPeliHttp () {
    if (!this.peliculaPojo) { return; }
    this.servicioHttpService.addNuevaPeli(this.peliculaPojo)
                     .subscribe(
                       peliculaPojo  => {this.pelisListHttp.push(peliculaPojo);
                         this.reiniciarPeliculaPojo();},
                       error =>  this.errorMessage = <any>error);
  }


  modificarPeliHttp () {
    if (!this.peliculaPojo) { return; }
    this.servicioHttpService.putPeli(this.peliculaPojo)
                     .subscribe(
                       peliculaPojo => this.miFuncionResultadoPut(),
                       //this.getPelisHttp,
                       //this.miFuncionResultadoPut,
                       //peliculaPojo  => this.pelisListHttp.push(peliculaPojo),
                       error =>  this.errorMessage = <any>error);
  }

  deletePeliHttp(){
    if (!this.peliculaPojo) { return; }
    this.servicioHttpService.deletePeli(this.peliculaPojo)
                     .subscribe(
                       //la funcion delete de typicode no devuelve nada, peliculaPojo es undefined.
                       peliculaPojo  => {console.log('Pelicula borrada con id:   ' +this.peliculaPojo.getId());
                       this.getPelisHttp();
                       this.reiniciarPeliculaPojo();},
                       error =>  this.errorMessage = <any>error);
  } 
//Fin de metodos relacionados con http

  miFuncionResultadoPut(){
    console.log('Resultado de put, modificar pelicula');
    //Vuelvo a hacer el get inicial para recargar toda la tabla, esto es provisional
    this.getPelisHttp();
    this.reiniciarPeliculaPojo();
    this.muestraConsola();

  }

  muestraConsola(){
    //solo para probar
    console.log('muestra consola prueba...........')
  }

  reiniciarPeliculaPojo(): void{
    this.peliculaPojo = undefined;
    this.peliculaPojo = new PeliculaPojo("","","","","","");
  }


}

export class Pelicula {
  id: number;
  titulo: string;
  director: string;
  sinopsis: string;
  clasificacion: string;
}
