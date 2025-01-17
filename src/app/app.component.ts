import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private aunt: AuthService) {}
  ngOnInit(): void {
    this.aunt.initAuthListener().subscribe((user) => {
      if (user) {
        console.log('Usuario autenticado:', user.email);
        console.log('Usuario autenticado:', user.uid);
      } 
    });
  }
  title = 'ingreso-egreso';
}
