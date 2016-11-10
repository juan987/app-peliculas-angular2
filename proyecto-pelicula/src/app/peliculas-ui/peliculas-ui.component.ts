import { Component, OnInit } from '@angular/core';
import {PeliculaPojo} from '../modelo-datos/Pelicula-Pojo';
import {ServicioPeliculasDaoService} from '../servicios/Servicio-Peliculas-Dao.Service';

@Component({
  selector: 'app-peliculas-ui',
  templateUrl: './peliculas-ui.component.html',
  styleUrls: ['./peliculas-ui.component.css']
})
export class PeliculasUiComponent implements OnInit {
  private peliculaPojo: PeliculaPojo;
  constructor() { 
    this.peliculaPojo = new PeliculaPojo("","","","","","")
  }

  ngOnInit() {
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
