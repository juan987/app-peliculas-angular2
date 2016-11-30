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

//Variables para mostrar cuando una columna no esta ordenada, 
//esta ordenada en orden ascendente o esta ordenada en orden descendente
colTitulo: string = "Título";
colDirector: string = "Director";


//Esta variable se usa para desmarcar una fila ya marcada cuando se hace un nuevo
//click en la tabla, de manera que SOLO una fila este resaltada a la vez
  hayUnaFilaClickada: number = -1;


//Variables para mostrar/ocultar o habilitar botones
  muestraBotonesModAndDel: boolean = true;


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

  //variable para controlar el tercer click seguido en la misma fila
  tercerClickEnLaMismaFila: number = 0;

  clickEnFila(miFila: any, indiceFilaTabla: any): void{
        console.log("Has hecho click en una fila, con indice=   " +indiceFilaTabla);
        this.booleanFilaClicked = true;

        //console.log("variable mi fila:    " +miFila.id)
        //console.log("variable mi fila:    " +miFila.titulo)
        //console.log("variable mi fila:    " +miFila.director)

        //this.peliculaPojo = miFila;

        this.peliculaPojo.setId(miFila._id);
        this.peliculaPojo.setTitulo(miFila.titulo);
        this.peliculaPojo.setDirector(miFila.director);
        this.peliculaPojo.setSinopsis(miFila.sinopsis);
        this.peliculaPojo.setFecha(miFila.fecha);
        this.peliculaPojo.setValoracion(miFila.valoracion);

        //si tecleo dos veces seguidas la misma fila,la segunda vez no entra en el if
        //Y se ejecuta la segunda parte del html en el click
        if(this.hayUnaFilaClickada != -1 && indiceFilaTabla != this.hayUnaFilaClickada){
        //if(indiceFilaTabla != this.hayUnaFilaClickada){
          console.log('a ver si funciona lo de los botones')
          this.pelisListHttp[this.hayUnaFilaClickada].booelanIsActive = false;
          this.tercerClickEnLaMismaFila = 0;
        }

        /*
        if(this.hayUnaFilaClickada == indiceFilaTabla){
          this.tercerClickEnLaMismaFila++;
          //Clear el formulario
          if(this.tercerClickEnLaMismaFila <= 1){
            this.reiniciarPeliculaPojo();
          }else{
            this.tercerClickEnLaMismaFila = 0;
          }
        }
        */
          
          if(this.hayUnaFilaClickada == indiceFilaTabla){
            if(this.muestraBotonesModAndDel == false){
              this.reiniciarPeliculaPojo();
              //this.muestraBotonesModAndDel = !this.muestraBotonesModAndDel;
              this.muestraBotonesModAndDel = true;
            }
          }
    
        this.hayUnaFilaClickada = indiceFilaTabla;
  }//Fin de clickEnFila

  clickGuardar(): void{
    console.log("Click en el boton guardar");
    this.addPeliHttp();
  }

  clickModificar(): void{
    this.boolTitulo = !this.boolTitulo;
    console.log('Click en el boton modificar');
    this.modificarPeliHttp();
  }

  clickBorrar(): void{
    console.log('Click en el boton borrar');
    this.deletePeliHttp();
  }

  clickOrdenarPorTitulo(): void{
    console.log('Click en columna titulo para ordenar');
    this.colDirector = "Director";
    if(this.boolTitulo){
      this.colTitulo= "Título asc";
      this.boolTitulo = !this.boolTitulo;
      //He tenido que cambiar todas las properties de PeliculaPojo a public,
      //por que sort no reconocia los getters
      this.pelisListHttp.sort((a: PeliculaPojo, b: PeliculaPojo): number =>{
        console.log('a ver que es a:     ' +a.titulo);
        if (a.titulo < b.titulo)
          return -1;
        if (a.titulo > b.titulo)
          return 1;
        return 0;
      });
    }else{
        this.colTitulo= "Título des";
        this.boolTitulo = !this.boolTitulo;
        this.pelisListHttp.reverse();
    }    
  }//Fin de clickOrdenarPorTitulo

  clickOrdenarPorDirector(): void{
    console.log('Click en columna director para ordenar');
    this.colTitulo = "Título";
    if(this.boolDirector){
      this.colDirector= "Director asc";
      this.boolDirector = !this.boolDirector;
      //He tenido que cambiar todas las properties de PeliculaPojo a public,
      //por que sort no reconocia los getters
      this.pelisListHttp.sort((a: PeliculaPojo, b: PeliculaPojo): number =>{
        if (a.director < b.director)
          return -1;
        if (a.director > b.director)
          return 1;
        return 0;
      });
    }else{
        this.colDirector= "Director des";
        this.boolDirector = !this.boolDirector;
        this.pelisListHttp.reverse();
    }    
  }//Fin de clickOrdenarPorDirector



//Metodos relacionados con http
  getPelisHttp() {
    this.servicioHttpService.getListaPeliculas()
                     .subscribe(
                       pelisListHttp => {this.pelisListHttp = pelisListHttp;
                          this.colTitulo= "Título";
                          this.colDirector= "Director";},
                       //Con slice(0) obtengo una copia del array
                       //pelisListHttp => this.pelisListHttp = pelisListHttp.slice(0),
                       error =>  this.errorMessage = <any>error);
  }

  
  addPeliHttp () {
    if (!this.peliculaPojo) { return; }
    this.servicioHttpService.addNuevaPeli(this.peliculaPojo)
                     .subscribe(
                       peliculaPojo  => {this.pelisListHttp.push(peliculaPojo);
                         this.reiniciarPeliculaPojo();
                         this.colTitulo= "Título";
                         this.colDirector= "Director";
                         this.muestraBotonesModAndDel = true;
                         this.hayUnaFilaClickada = -1;},
                       error =>  this.errorMessage = <any>error);
  }


  modificarPeliHttp () {
    if (!this.peliculaPojo) { return; }
    this.servicioHttpService.putPeli(this.peliculaPojo)
                     .subscribe(
                       peliculaPojo => {this.miFuncionResultadoPut();
                         this.muestraBotonesModAndDel = true;
                        this.hayUnaFilaClickada = -1;},
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
                       //peliculaPojo  => {console.log('Pelicula borrada con id:   ' +peliculaPojo.peli;
                       this.getPelisHttp();
                       this.reiniciarPeliculaPojo();
                       this.muestraBotonesModAndDel = true;
                      this.hayUnaFilaClickada = -1;},
                       error =>  this.errorMessage = <any>error);
  } 
//Fin de metodos relacionados con http

//Este lo puse asi, para ver que tambien puedo llamar a una funcion con desde 
//una funcion lambda
  miFuncionResultadoPut(){
    console.log('Resultado de put, modificar pelicula');
    //Vuelvo a hacer el get inicial para recargar toda la tabla, esto es provisional
    this.getPelisHttp();
    this.reiniciarPeliculaPojo();
    this.muestraConsola();
    this.colTitulo= "Título";
    this.colDirector= "Director des";
  }

  muestraConsola(){
    //solo para probar
    console.log('muestra consola prueba...........')
  }

  reiniciarPeliculaPojo(): void{
    this.peliculaPojo = undefined;
    this.peliculaPojo = new PeliculaPojo("","","","","","");
  }

/*

//No uso esto que fue el servicio con el array. Ahora uso http.

//para coger los datos de las peliculas
  getDatos2(): PeliculaPojo[]{
    //return this.listaDePeliculas;

    //Con un servicio local
    return this.servicioPeliculasDaoService.getListaPeliculas();

    //Con el servicio http
    //return this.getPelisHttp();
  }
*/

/*
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
  */

}//Fin de PeliculasUiComponent


//No lo uso
/*
  export class Pelicula {
    id: number;
    titulo: string;
    director: string;
    sinopsis: string;
    clasificacion: string;
  }
*/
