import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InteractionComponent } from './interaction/interaction.component';
import { WebSocketService } from './web-socket.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    InteractionComponent,
    HttpClientModule
  ],
  providers: [WebSocketService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  active_users!: number;
  users!: number;

  constructor(private webSocketService: WebSocketService, private http: HttpClient) {}

  ngOnInit() {
    // this.fetchActiveUsers()
    this.webSocketService.getActiveUsers().subscribe(data => {
      console.log(data.active_users)
      this.users = data.active_users
    })

    this.webSocketService.listen('active_users').subscribe((data) => {
      console.log(data)
      this.active_users = data
    })
  }

  // getActiveUsers() {
  //   this.webSocketService.getActiveUsers().subscribe((data) => {
  //     this.users = data
  //   })
  // }

  // fetchActiveUsers() {
  //   this.http.get('http://localhost:5000/active_users').subscribe((data) => {
  //     console.log(data)
  //   })
  // }

  ngOnDestroy() {
    this.webSocketService.disconnect()
  }
}
