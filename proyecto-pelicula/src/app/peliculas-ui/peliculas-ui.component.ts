import { Component, OnInit } from '@angular/core';
import {PeliculaPojo} from '../modelo-datos/Pelicula-Pojo';
import {ServicioPeliculasDaoService} from '../servicios/Servicio-Peliculas-Dao.Service';
import {ServicioHttpService} from '../servicios/Servicio-Http.Service';

ServicioHttpService

@Component({
  selector: 'app-peliculas-ui',
  templateUrl: './peliculas-ui.component.html',
  styleUrls: ['./peliculas-ui.component.css'],
  providers: [ServicioPeliculasDaoService, ServicioHttpService]
})
export class PeliculasUiComponent implements OnInit {

  private peliculaPojo: PeliculaPojo;
  //private listaDePeliculas: PeliculaPojo[];
  //private servicioPeliculasDaoService: ServicioPeliculasDaoService;
  public booleanFilaClicked: boolean = false;

  constructor(private servicioPeliculasDaoService: ServicioPeliculasDaoService,
              private servicioHttpService: ServicioHttpService) { 
    this.peliculaPojo = new PeliculaPojo("","","","","","")
    //this.listaDePeliculas = servicioPeliculasDaoService.getListaPeliculas();
    //this.servicioPeliculasDaoService = servicioPeliculasDaoService;
  }

  ngOnInit() {
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

  }


//para coger los datos de las peliculas
  getDatos2(): PeliculaPojo[]{
    //return this.listaDePeliculas;
    return this.servicioPeliculasDaoService.getListaPeliculas();
  }

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


}

export class Pelicula {
  id: number;
  titulo: string;
  director: string;
  sinopsis: string;
  clasificacion: string;
}
