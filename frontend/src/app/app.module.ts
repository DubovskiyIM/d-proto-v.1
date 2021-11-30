import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TuiRootModule, TuiDialogModule, TuiNotificationsModule, TUI_SANITIZER, TuiGroupModule } from '@taiga-ui/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF, PlatformLocation, CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { NgxMasonryModule } from 'ngx-masonry';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { AppRoutingModule } from './app-routing.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { TuiInputInlineModule, TuiInputModule } from '@taiga-ui/kit';
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
import { FavoriteDirective } from './_directives/favorite.directive';
import { NotifyComponent } from './components/notify/notify.component';
import { ProductFeedbackComponent } from './components/product-feedback/product-feedback.component';
import { AvatarDetailComponent } from './components/avatar-detail/avatar-detail.component';
import { MoreProductByAuthorComponent } from './components/more-product-by-author/more-product-by-author.component';
import { ProductFeedbacksListComponent } from './components/product-feedbacks-list/product-feedbacks-list.component';
import { LikedProductsComponent } from './pages/liked-products/liked-products.component';
import { SearchLineComponent } from './components/search-line/search-line.component';
import { TuiCardModule } from '@taiga-ui/addon-commerce';
import { TuiImportsModule } from './_modules/tui-imports.module';
import { DialogPromptComponent } from './components/dialog-prompt/dialog-prompt.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FeedbackModalViewComponent } from './components/feedback-modal-view/feedback-modal-view.component';
import { DynamicFormsMaterialUIModule } from '@ng-dynamic-forms/ui-material';
import { ComboBoxSelectComponent } from './components/combo-box-select/combo-box-select.component';
import { HistoryOrdersCardsComponent } from './components/history-orders-cards/history-orders-cards.component';
import { CustomTagControlComponent } from './components/_scheme-controls/dynamic-custom-form-control/custom-tag-control/custom-tag-control.component';
import { DynamicCustomFormControlComponent } from './components/_scheme-controls/dynamic-custom-form-control/dynamic-custom-form-control.component';
import { DYNAMIC_FORM_CONTROL_MAP_FN, DynamicFormControl, DynamicFormControlModel } from '@ng-dynamic-forms/core';
import { DynamicCustomEditorComponent } from './components/_scheme-controls/dynamic-custom-editor/dynamic-custom-editor.component';
import { CustomEditorComponent } from './components/_scheme-controls/dynamic-custom-editor/custom-editor/custom-editor.component';
import { DynamicCustomInputComponent } from './components/_scheme-controls/dynamic-custom-input/dynamic-custom-input.component';
import { CustomInputControlComponent } from './components/_scheme-controls/dynamic-custom-input/custom-input-control/custom-input-control.component';
import { DynamicCustomSelectComponent } from './components/_scheme-controls/dynamic-custom-select/dynamic-custom-select.component';
import { CustomSelectControlComponent } from './components/_scheme-controls/dynamic-custom-select/custom-select-control/custom-select-control.component';
import { DynamicCustomRadioGroupComponent } from './components/_scheme-controls/dynamic-custom-radio-group/dynamic-custom-radio-group.component';
import { CustomRadioGroupComponent } from './components/_scheme-controls/dynamic-custom-radio-group/custom-radio-group/custom-radio-group.component';
import { CategoryProductComponent } from './components/category-product/category-product.component';
import { DynamicCustomFileComponent } from './components/_scheme-controls/dynamic-custom-file/dynamic-custom-file.component';

// import { NotifyMessageComponent } from "./components/notify/notify.component";

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
    FavoriteDirective,
    NotifyComponent,
    ProductFeedbackComponent,
    AvatarDetailComponent,
    MoreProductByAuthorComponent,
    ProductFeedbacksListComponent,
    LikedProductsComponent,
    SearchLineComponent,
    DialogPromptComponent,
    LoaderComponent,
    FeedbackModalViewComponent,
    ComboBoxSelectComponent,
    HistoryOrdersCardsComponent,
    CustomTagControlComponent,
    DynamicCustomFormControlComponent,
    DynamicCustomEditorComponent,
    CustomEditorComponent,
    DynamicCustomInputComponent,
    CustomInputControlComponent,
    DynamicCustomSelectComponent,
    CustomSelectControlComponent,
    DynamicCustomRadioGroupComponent,
    CustomRadioGroupComponent,
    CategoryProductComponent,
    DynamicCustomFileComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TuiCardModule,
    HttpClientModule,
    MaterialImportsModule,
    DynamicFormsMaterialUIModule,
    FormsModule,
    CommonModule,
    NgxMasonryModule,
    NgxUsefulSwiperModule,
    SocketIoModule.forRoot(config),
    TuiImportsModule,
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
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    {
      provide: DYNAMIC_FORM_CONTROL_MAP_FN,
      useValue: (model: DynamicFormControlModel): Type<DynamicFormControl> | null => {
        switch (model.type === 'INPUT' ? model.name : model.type) {
          case 'INPUT':
            return DynamicCustomInputComponent;
          case 'TAGS':
            return DynamicCustomFormControlComponent;
          case 'EDITOR':
            return DynamicCustomEditorComponent;
          case 'SELECT':
            return DynamicCustomSelectComponent;
          case 'RADIO_GROUP':
            return DynamicCustomRadioGroupComponent;
          case 'FILE':
            // return
        }
      },
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [DynamicCustomFormControlComponent],
})
export class AppModule {}
