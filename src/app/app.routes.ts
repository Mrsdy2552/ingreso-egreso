import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: '', component: DashboardComponent, children: dashboardRoutes   },
  { path: '**', redirectTo: '' },
];
