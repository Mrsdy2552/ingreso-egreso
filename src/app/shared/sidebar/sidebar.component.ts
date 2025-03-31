import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../app.reducex';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit, OnDestroy {
  constructor(
    private aunt: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  userName: string = '';
  userSubs!: Subscription;

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
  }
  ngOnInit(): void {
    this.userSubs = this.store
      .select('user')
      .subscribe(({ user }) => (this.userName = user?.nombre || ''));
  }

  logout() {
    this.aunt.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
