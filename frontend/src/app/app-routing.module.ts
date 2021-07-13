import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './lk/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { EditComponent } from './lk/edit/edit.component';
import { MyOrdersComponent } from './lk/my-orders/my-orders.component';
import { LkComponent } from './lk/lk.component';
import { MessagesComponent } from './lk/messages/messages.component'; // CLI imports router

const lkRoutes: Routes = [
  { path: 'edit', component: EditComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'orders', component: MyOrdersComponent },
  { path: 'messages', component: MessagesComponent },
];
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'lk',
    component: LkComponent,
    canActivate: [AuthGuard],
    children: lkRoutes,
    // children: [
    //   { path: 'edit', component: EditComponent },
    //   { path: 'orders', component: MyOrdersComponent },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
