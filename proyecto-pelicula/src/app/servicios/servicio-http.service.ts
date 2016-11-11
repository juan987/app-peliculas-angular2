import { Injectable } from '@angular/core';
import {PeliculaPojo} from '../modelo-datos/Pelicula-Pojo';
import {PeliculaPojo2} from '../modelo-datos/Pelicula-Pojo2';

import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';


@Injectable()
export class ServicioHttpService {
  private urlGet = 'http://localhost:3000/peliculas';  // URL para get el json con la lista de peliculas

  constructor(private http: Http) { }

  getListaPeliculas(): Observable<PeliculaPojo[]>{
    return this.http.get(this.urlGet)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  private extractData(res: Response) {
    console.log("En http service, la response es:   " +res);
    let body = res.json();
    console.log("En http service, el body es   " +body);
    //console.log("En http service, el titulo 0 es   " +body[0].titulo);

//Si retorno body data, da error.
    //return body.data || { };
    return body;
    //return JSON.stringify(body);

    
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

//***********************************************************************************************

  private urlPost = 'http://localhost:3000/peliculas';  // URL para get el json con la lista de peliculas

  addNuevaPeli (peliculaPojo: PeliculaPojo): Observable<PeliculaPojo> {
    let nuevaPeliJson = {
    "titulo": peliculaPojo.getTitulo(),
    "director": peliculaPojo.getDirector(),
    "sinopsis": peliculaPojo.getSinopsis(),
    "fecha": peliculaPojo.getFecha(),
    "valoracion": peliculaPojo.getValoracion()
    };

    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //return this.http.post(this.urlPost, peliculaPojo, options)
    return this.http.post(this.urlPost, nuevaPeliJson, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

}
