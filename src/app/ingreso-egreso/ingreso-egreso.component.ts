import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AppState } from '../app.reducex';
import { Store } from '@ngrx/store';
import { isLoading, stopLoading } from '../shared/ui.action';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-ingreso-egreso',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ingreso-egreso.component.html',
  styleUrl: './ingreso-egreso.component.css',
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  inresoFrom!: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;
  loadinSubs!: Subscription;
  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}


  ngOnInit(): void {
    this.loadinSubs = this.store
      .select('ui')
      .subscribe(({ isLoading }) => (this.cargando = isLoading));

    this.inresoFrom = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });
  }

  guardar() {
    this.store.dispatch(isLoading());
 
    const { descripcion, monto } = this.inresoFrom.value;

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(() => {
      this.inresoFrom.reset();
      this.store.dispatch(stopLoading());
    });
  }
  ngOnDestroy(): void {
    this.loadinSubs.unsubscribe();
  }
}
