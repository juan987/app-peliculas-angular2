import { Injectable } from '@angular/core';
import {PeliculaPojo} from '../modelo-datos/Pelicula-Pojo';


@Injectable()
export class ServicioPeliculasDaoService {
  private peliculasArray: PeliculaPojo[] = [
    new PeliculaPojo('1', 'titulo 1', 'director 1', 'sinopsis 1', 'fecha', 'valoracion'),
    new PeliculaPojo('2', 'titulo 2', 'director 2', 'sinopsis 2', 'fecha 2', 'valoracion 2'),
  ];
  
  constructor() { }

  getListaPeliculas(): PeliculaPojo[]{
    return this.generarLista();
  }

  generarLista(): PeliculaPojo[]{
    return this.peliculasArray;
  }




}
