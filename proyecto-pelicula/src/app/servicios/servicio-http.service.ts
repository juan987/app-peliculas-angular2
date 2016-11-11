import { Injectable } from '@angular/core';
import {PeliculaPojo} from '../modelo-datos/Pelicula-Pojo';

import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ServicioHttpService {
  private urlGet = 'hgkjhkjhkj';  // URL para get el json con la lista de peliculas

  constructor(private http: Http) { }

  getListaPeliculas(): Observable<PeliculaPojo[]>{
    return this.http.get(this.urlGet)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
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
  addNuevaPeli(pelicula: PeliculaPojo): PeliculaPojo{
    return new PeliculaPojo("","","","","","");
  }

}
