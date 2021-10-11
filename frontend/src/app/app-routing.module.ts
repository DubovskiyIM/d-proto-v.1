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
import { UsersComponent } from  './pages/users/users.component'
import { AddProductComponent} from './pages/add-product/add-product.component'
import {SettingsComponent} from "./pages/settings/settings.component";
import {LikedProductsComponent} from "./pages/liked-products/liked-products.component";
import {RegistrationComponent} from "./pages/registration/registration.component";

const lkRoutes: Routes = [
  { path: 'home', component: MyProfileComponent },
  { path: 'orders', component: MyOrdersComponent },
  { path: 'favorite', component: LikedProductsComponent },
  { path: 'messages', component: MessagesComponent, pathMatch: 'full'},
  { path: 'messages/:id', component: MessagesComponent },
  { path: 'create', component: AddProductComponent },
  { path: 'settings', component: SettingsComponent }
];
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
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

  { path: 'users', component: UsersComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'product/:id', component: ProductPageComponent },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
