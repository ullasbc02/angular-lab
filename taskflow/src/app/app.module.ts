import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';
import { App } from './app';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';

@NgModule({
  declarations: [App, Dashboard],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule, Login],
  bootstrap: [App]
})
export class AppModule { }