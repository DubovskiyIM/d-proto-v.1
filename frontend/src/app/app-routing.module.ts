import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './lk/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { MyOrdersComponent } from './lk/my-orders/my-orders.component';
import { LkComponent } from './lk/lk.component';
import { MessagesComponent } from './lk/messages/messages.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {ProductPageComponent} from "./pages/product-page/product-page.component";

const lkRoutes: Routes = [
  { path: 'home', component: MyProfileComponent },
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
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'product/:id', component: ProductPageComponent },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
