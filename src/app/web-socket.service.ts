import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval, switchMap } from 'rxjs';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: any

  constructor( private http: HttpClient) {
    this.socket = io('http://localhost:5000');
  }

  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data)
      })
    })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  getActiveUsers(): Observable<any> {
    return interval(10000) 
      .pipe(
        switchMap(() => this.http.get('http://localhost:5000/active_users')),
      );
  }

  // getActiveUsers(): Observable<any> {
  //   return this.http.get('http://localhost:5000/active_users')
  // }
}
