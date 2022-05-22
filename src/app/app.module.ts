import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './service/auth-interceptor.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule ],
  declarations: [ AppComponent, HelloComponent ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
