import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client'
import * as Stomp from 'stompjs';
import { environment } from '../../../../environments/environments';
import { Client } from '@stomp/stompjs';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket(environment.websocketUrl);
    
    this.socket.onopen = (event) => {
      console.log('WebSocket is open now.');
    };

    this.socket.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket is closed now.');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error observed:', error);
    };
  }
}
