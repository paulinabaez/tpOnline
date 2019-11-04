import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { PagesComponent } from './pages/pages.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { TablesComponent } from './shared/tables/tables.component';
import { DataTablesModule } from 'angular-datatables';
import { PipesModule } from './pipes/pipes.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxNotificationComponent } from 'ngx-notification';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProyectosComponent,
    PagesComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    TablesComponent,
    NgxNotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule, 
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
