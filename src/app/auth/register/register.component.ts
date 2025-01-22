import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppComponent } from '../../app.component';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducex';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.action';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, OnDestroy {
  fromGrup!: FormGroup;
  cargando: boolean = false;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}
  uiSubscription!: Subscription;
  ngOnInit(): void {
    this.fromGrup = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
      console.log('cargando subs', this.cargando);
    });
  }

  ngOnDestroy(): void {
    console.log('quitando subs', this.cargando);
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {
    if (this.fromGrup.invalid) {
      return;
    }

    // Swal.fire({
    //   title: 'espere por favor...',
    //   willOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    this.store.dispatch(ui.isLoading());
    const { nombre, correo, password } = this.fromGrup.value;
    this.auth
      .crearUsuario(nombre, correo, password)
      .then((crednciales) => {
        console.log(crednciales);
        this.store.dispatch(ui.stopLoading());
        // Swal.close();
        this.router.navigate(['/']);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  }
}
