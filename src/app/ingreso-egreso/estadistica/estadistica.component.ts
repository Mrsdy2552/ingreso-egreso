import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducex';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estadistica.component.html',
  styleUrl: './estadistica.component.css',
})
export class EstadisticaComponent implements OnInit {
  ingresos: number = 0;
  Totalingresos: number = 0;

  egresos: number = 0;
  Totalegresos: number = 0;

  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.store.select('ingresEgresos').subscribe(({ items }) => {
      console.log(items);

      this.generarEstadistica(items);
    });
  }
  generarEstadistica(items: IngresoEgreso[]) {
    for (let index = 0; index < items.length; index++) {
      const element = items[index];

      if (element.tipo === 'ingreso') {
        this.ingresos++;
        this.Totalingresos += element.monto;
      }

      if (element.tipo === 'egreso') {
        this.egresos++;
        this.Totalegresos += element.monto;
      }
    }
  }
}
