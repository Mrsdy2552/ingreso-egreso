import { Component, Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private aunt: AuthService,
       private router: Router
  ) {}
  logout() {
    this.aunt.logout().then(() => {
     this.router.navigate(['/login']);

    });
  }
}
