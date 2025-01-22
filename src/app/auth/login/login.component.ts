import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducex';
import * as ui from '../../shared/ui.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginFrom!: FormGroup;
  cargando: boolean = false;
  uiSubscription!: Subscription;
  constructor(
    private fb: FormBuilder,
    private aunt: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loginFrom = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });

    this.uiSubscription =  this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
      console.log('cargando subs', this.cargando);
    });
  }
  ngOnDestroy(): void {
    console.log('quitando subs', this.cargando);
    this.uiSubscription.unsubscribe();
  }
  loginUsuario() {
    // Swal.fire({
    //   title: 'espere por favor...',
    //   willOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    if (this.loginFrom.valid) {
      this.store.dispatch(ui.isLoading());

      const { email, password } = this.loginFrom.value;
      this.aunt
        .loginUsuario(email, password)
        .then((crednciales) => {
          this.store.dispatch(ui.stopLoading());
          // Swal.close();
          console.log(crednciales);
          this.router.navigate(['/']);
        })
        .catch((err) => {
          this.store.dispatch(ui.stopLoading());
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
          });
        });
    }
  }
}
