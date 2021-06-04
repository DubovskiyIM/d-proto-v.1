import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  { path: 'me', component: ProfileComponent, pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(routes);
