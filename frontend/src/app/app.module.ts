import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF, PlatformLocation, CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { NgxMasonryModule } from 'ngx-masonry';
import { AppRoutingModule } from './app-routing.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { ErrorInterceptor } from './_interceptor/error.interceptor';
import { JwtInterceptor } from './_interceptor/jwt.interceptor';
import { ProfileComponent } from './lk/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialImportsModule } from './_modules/material-imports.module';
import { LkComponent } from './lk/lk.component';
import { MyOrdersComponent } from './lk/my-orders/my-orders.component';
import { StarRatingsComponent } from './components/star-ratings/star-ratings.component';
import { LkNavbarItemsComponent } from './components/lk-navbar-items/lk-navbar-items.component';
import { CardComponent } from './components/card/card.component';
import { MessagesComponent } from './lk/messages/messages.component';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ChatComponent } from './lk/chat/chat.component';
import { ChatMessageComponent } from './lk/chat/chat-message/chat-message.component';
import { ConversationComponent } from './lk/messages/conversation/conversation.component';
import { CardsComponent } from './lk/cards/cards.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DefaultHomePageComponent } from './pages/default-home-page/default-home-page.component';
import { CardModalComponent } from './components/card/card-modal/card-modal.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { UsersComponent } from './pages/users/users.component';
import { AddNewCardViewComponent } from './components/card/add-new-card-view/add-new-card-view.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { DragAndDropFileComponent } from './components/drag-and-drop-file/drag-and-drop-file.component';
import { DndDirective } from './_directives/dnd.directive';
import { RightProfileNavbarComponent } from './components/right-profile-navbar/right-profile-navbar.component';
import { SettingsComponent } from './pages/settings/settings.component';

export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}

const config: SocketIoConfig = { url: 'localhost:3001', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    HeaderComponent,
    LkComponent,
    MyOrdersComponent,
    StarRatingsComponent,
    LkNavbarItemsComponent,
    CardComponent,
    MessagesComponent,
    ProgressSpinnerComponent,
    AvatarComponent,
    ChatComponent,
    ChatMessageComponent,
    ConversationComponent,
    CardsComponent,
    MyProfileComponent,
    NavbarComponent,
    HomePageComponent,
    DefaultHomePageComponent,
    CardModalComponent,
    ProductPageComponent,
    UsersComponent,
    AddNewCardViewComponent,
    AddProductComponent,
    CreateProductComponent,
    DragAndDropFileComponent,
    DndDirective,
    RightProfileNavbarComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialImportsModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    NgxMasonryModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation],
    },
    CookieService,
    // fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
