import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginFrom!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private aunt: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginFrom = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  loginUsuario() {
    Swal.fire({
      title: 'espere por favor...',
      willOpen: () => {
        Swal.showLoading();
      },
    });

    if (this.loginFrom.valid) {
      const { email, password } = this.loginFrom.value;
      this.aunt
        .loginUsuario(email, password)
        .then((crednciales) => {
          Swal.close();
          console.log(crednciales);
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
}
