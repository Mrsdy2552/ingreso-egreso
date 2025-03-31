import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducex';
import { filter, Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems } from '../ingreso-egreso/ingresoEgreso.action';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  userSubs!: Subscription;
  IngresoEgresoSubs!: Subscription;

  ngOnDestroy(): void {
    this.IngresoEgresoSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubs = this.store
      .select('user')
      .pipe(filter(({ user }) => user != null))
      .subscribe(({ user }) => {
        console.log(user);
        if (user) {
          this.IngresoEgresoSubs = this.ingresoEgresoService
            .initIngresoEgresosListener(user.uid)
            .subscribe((ingresosEgresos) => {
              this.store.dispatch(setItems({ items: ingresosEgresos }));
            });
        }
      });
  }
}
