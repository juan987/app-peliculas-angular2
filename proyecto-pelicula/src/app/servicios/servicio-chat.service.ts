import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import * as io from 'socket.io-client';

import { MensajeChat1 } from '../modelo-datos/mensaje-chat-1';


@Injectable()
export class ServicioChatService {
  private url: string = 'http://localhost:3000';
  private socket;

  private mensajeDeNuevoUsuarioConnected = new MensajeChat1("","");


  constructor() { }
  sendMessage(message: MensajeChat1):void{
    console.log("Enviando mensaje " + message);
    this.socket.emit('mando-un-mensaje',message);
  }
  getMessages(){
    return new Observable(//alpha
      (observer)=>{//beta
        // conexion con el servidor
        this.socket = io(this.url);
        // metodos de gestión de mensajes
        this.socket.on('connect',()=>{
          console.log("Cliente conectado con id: " + 
              this.socket.id)
          //Muestro quien se ha conectado
          this.mensajeDeNuevoUsuarioConnected.content = this.socket.id;
          this.mensajeDeNuevoUsuarioConnected.user = 'nuevo_usuario';
          observer.next(this.mensajeDeNuevoUsuarioConnected);
        });
        this.socket.on('mando-un-mensaje',(datos)=>{
          observer.next(datos);
        });
        // Una forma de unsubscribe
        return ()=>{
          this.socket.disconnect();
        }
      }//Fin de beta
    );//Fin de alpha
  }

}
