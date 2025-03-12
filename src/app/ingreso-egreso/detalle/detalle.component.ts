import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../app.reducex';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',
})
export class DetalleComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private IngresoEgresoSer: IngresoEgresoService
  ) {}
  IngresoEgresoSubs!: Subscription;

  IngresoEgreso: IngresoEgreso[] = [];

  ngOnInit(): void {
    this.IngresoEgresoSubs = this.store
      .select('ingresEgresos')
      .subscribe(({ items }) => {
        console.log(items);

        this.IngresoEgreso = items;
      });
  }
  borrar(uid: string | undefined) {
    if (uid != undefined) {
      this.IngresoEgresoSer.borrarIngreso(uid)
        .then(() => {
          Swal.fire('Borrado', 'Item borrado', 'success');
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(uid);
  }

  ngOnDestroy(): void {
    this.IngresoEgresoSubs.unsubscribe();
  }
}
