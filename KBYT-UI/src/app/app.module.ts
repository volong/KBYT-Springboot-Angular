import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AuthService } from './@core/service/auth.service';
import { AuthInterceptor } from './@core/auth.interceptor';
import { UpdateComponent } from './user/update/update.component';


registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    AuthService,
  {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  },
    // {
    //   provide: HTTP_INTERCEPTORS, useClass: CorsIntereptor, multi: true
    // },
    // {
    //   provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
