import { Component, OnInit } from '@angular/core';
import {PeliculaPojo} from '../modelo-datos/Pelicula-Pojo';
import {PeliculaPojo2} from '../modelo-datos/Pelicula-Pojo2';
import {ServicioPeliculasDaoService} from '../servicios/Servicio-Peliculas-Dao.Service';
import {ServicioHttpService} from '../servicios/Servicio-Http.Service';

// Add the RxJS Observable operators. para gestionar HTTP
import './rxjs-operators';

//Para gestionar el autocomplete
import {FormBuilder, Validators, FormGroup  } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Http, Response } from '@angular/http';
//Fin autocomplete

//Para el chat, el 11Dic16
import {OnDestroy } from '@angular/core';
import { ServicioChatService } from '../servicios/servicio-chat.service';
import { MensajeChat1 } from '../modelo-datos/mensaje-chat-1';

@Component({
  selector: 'app-peliculas-ui',
  templateUrl: './peliculas-ui.component.html',
  styleUrls: ['./peliculas-ui.component.css'],
  providers: [ServicioPeliculasDaoService, ServicioHttpService, ServicioChatService]
})


export class PeliculasUiComponent implements OnInit, OnDestroy {

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


  //Variables de autocomplete
  searchForm: FormGroup;
  results: Observable<any>;

  //Variables del chat, 11Dic16
  private messages: MensajeChat1[] = [];
  private message: MensajeChat1;
  private message_de_usuario_conectado: MensajeChat1;
  private message_de_DB_Modificada: MensajeChat1;
  private connection;
  //para detectar que alguien ha cambiado la base de datos a traves del chat
  private nombrePeliculaInfoChat: string;




  constructor(private servicioPeliculasDaoService: ServicioPeliculasDaoService,
              private servicioHttpService: ServicioHttpService,
              private fb: FormBuilder, private http: Http,
              private service: ServicioChatService) { 
    this.peliculaPojo = new PeliculaPojo("","","","","","");
    //this.listaDePeliculas = servicioPeliculasDaoService.getListaPeliculas();
    //this.servicioPeliculasDaoService = servicioPeliculasDaoService;

    //*******************************************************************************************
    // Autocomplete 9dic16 en casa
    //Como en : http://venckicode.blogspot.com.es/2016/06/type-ahead-search-with-angular2-and.html
    //Y como en http://blog.ng-book.com/the-ultimate-guide-to-forms-in-angular-2/
    //para los temas de 
    // ReactiveFormsModule gives us directives like formControl and ngFormGroup
    //*******************************************************************************************
        
        
        this.searchForm = this.fb.group({
            'searchField': ['']
        });

        //var ctrl = this.searchForm.controls.searchField;
        var ctrl = this.searchForm.controls['searchField']
        //var ctrl = this.searchForm.controls.searchField;

        this.results = ctrl.valueChanges
                    .debounceTime(500)
                    .distinctUntilChanged()
                    //.switchMap(fieldValue => this.http.get(`http://localhost:3001/api/search?term=${fieldValue}`))
                    .switchMap(fieldValue => 
                        //console.log('en switch map, valor de fieldvalue: ' +fieldValue);
                        this.http.get(`http://localhost:3000/peliculas/autocomplete/` +fieldValue))
                    .map(res => res.json());
                    
        

    //***********************************
    // FIN de Autocomplete 9dic16 en casa
    //***********************************


  }//Fin del constructor

  ngOnInit() {
    this.getPelisHttp();

    //Codigo en el ngOnInit del chat
    //para mantenerse a la escucha
    this.message = new MensajeChat1("","",0);
    this.message_de_usuario_conectado = new MensajeChat1("","",0);
    this.message_de_DB_Modificada = new MensajeChat1("","",1);
    



    this.connection = this.service.getMessages().subscribe(
      (newMessage: MensajeChat1)=>{
          console.log("New message received!");
          this.messages.push(newMessage);

          //Hay que discriminar si el mensaje es para informar de un
          //usuario que se acaba de conectar,
          //y si es asi, hacemos broadcast para informar al resto
          let  comparar = newMessage.user.localeCompare('nuevo_usuario');
          if(comparar == 0){
            this.message_de_usuario_conectado.content = "Esta conectado!!!";
            this.message_de_usuario_conectado.user = newMessage.content;
            console.log("Broadcast notificando que me acabo de conectar " + this.message_de_usuario_conectado)
            this.service.sendMessage(this.message_de_usuario_conectado);
          }

          //Si el mensaje tiene la propiedad dbModificada a 1,
          //y yo no soy el usuario que ha modificado, lanzo 
          // actualizacion de la DB con this.getPelisHttp();
          //No lo implemento aun.

      }
    )
  }//Fin de ngOnInit

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
    //Uso esta variable para informar al chat que algo ha sido
    //modificado en la DB de peliculas
    this.nombrePeliculaInfoChat = this.peliculaPojo.getTitulo();
    //Este if no es muy util, la verdad.
    if (!this.peliculaPojo) { return; }
    this.servicioHttpService.addNuevaPeli(this.peliculaPojo)
                     .subscribe(
                       peliculaPojo  => {this.pelisListHttp.push(peliculaPojo);
                         this.reiniciarPeliculaPojo();
                         this.colTitulo= "Título";
                         this.colDirector= "Director";
                         this.muestraBotonesModAndDel = true;
                         this.hayUnaFilaClickada = -1;
                         //La peli nueva se ha guardado bien,
                         //envio mensaje al chat
                         this.message_de_DB_Modificada.content = "La pelicula: "
                                      +this.nombrePeliculaInfoChat + ", ha sido guardada en la DB";
                         this.sendMessageDbModificada(this.message_de_DB_Modificada);

                      },
                       error =>  this.errorMessage = <any>error);
  }


  modificarPeliHttp () {
    //Uso esta variable para informar al chat que algo ha sido
    //modificado en la DB de peliculas
    this.nombrePeliculaInfoChat = this.peliculaPojo.getTitulo();
    if (!this.peliculaPojo) { return; }
    this.servicioHttpService.putPeli(this.peliculaPojo)
                     .subscribe(
                       peliculaPojo => {this.miFuncionResultadoPut();
                         this.muestraBotonesModAndDel = true;
                        this.hayUnaFilaClickada = -1;
                        //La peli ha sido modificada bien,
                        //envio mensaje al chat
                         this.message_de_DB_Modificada.content = "La pelicula: "
                                      +this.nombrePeliculaInfoChat + ", ha sido modificada en la DB";
                         this.sendMessageDbModificada(this.message_de_DB_Modificada);  
                    },
                       //this.getPelisHttp,
                       //this.miFuncionResultadoPut,
                       //peliculaPojo  => this.pelisListHttp.push(peliculaPojo),
                       error =>  this.errorMessage = <any>error);
  }

  deletePeliHttp(){
    //Uso esta variable para informar al chat que algo ha sido
    //modificado en la DB de peliculas
    this.nombrePeliculaInfoChat = this.peliculaPojo.getTitulo();
    if (!this.peliculaPojo) { return; }
    this.servicioHttpService.deletePeli(this.peliculaPojo)
                     .subscribe(
                       //la funcion delete de typicode no devuelve nada, peliculaPojo es undefined.
                       peliculaPojo  => {console.log('Pelicula borrada con id:   ' +this.peliculaPojo.getId());
                       //peliculaPojo  => {console.log('Pelicula borrada con id:   ' +peliculaPojo.peli;
                       this.getPelisHttp();
                       this.reiniciarPeliculaPojo();
                       this.muestraBotonesModAndDel = true;
                      this.hayUnaFilaClickada = -1;
                      //La peli ha sido modificada bien,
                        //envio mensaje al chat
                         this.message_de_DB_Modificada.content = "La pelicula: "
                                      +this.nombrePeliculaInfoChat + ", ha sido borrada de la DB";
                         this.sendMessageDbModificada(this.message_de_DB_Modificada); 
                    },
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

//***************************************************************************
// Codigo para el chat con el servicio servicio-chat.service, el 11Dic16
//***************************************************************************


  //Boton del chat para enviar mensaje
  sendMessage(){
    console.log("Mensaje a enviar por component: " + this.message)
    this.service.sendMessage(this.message);
  }

  //Boton del chat para vaciar el char
  vaciarChat(){
    console.log("Vaciar el chat ")
    this.messages = [];  
  }

  //Mensaje de chat indicar que la db ha sido modificada
  sendMessageDbModificada(messageDbModificada: MensajeChat1){
    console.log("Mensaje a enviar por component de base de datos modificada: " + this.message)
    this.message_de_DB_Modificada.user = this.message.user;
    this.service.sendMessageDbModificada(messageDbModificada);
  }

  //Ya tengo ngOnInit arriba, pongo este codigo alli
  /*
  ngOnInit() {
    this.message = new Message("","");
    this.connection = this.service.getMessages().subscribe(
      (newMessage: Message)=>{
          console.log("New message received!");
          this.messages.push(newMessage);
      }
    )
  }
  */
  ngOnDestroy(){
    this.connection.unsubscribe();
  }
//******************************************************************************
// FIN de Codigo para el chat con el servicio servicio-chat.service, el 11Dic16
//******************************************************************************

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
