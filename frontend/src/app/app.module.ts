import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF, PlatformLocation, CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { ErrorInterceptor } from './_interceptor/error.interceptor';
import { JwtInterceptor } from './_interceptor/jwt.interceptor';
import { ProfileComponent } from './pages/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialImportsModule } from './_modules/material-imports.module';
import { LkComponent } from './lk/lk.component';
import { EditComponent } from './lk/edit/edit.component';
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

export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    HeaderComponent,
    LkComponent,
    EditComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialImportsModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation],
    },
    // fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
