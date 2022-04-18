import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './outros/header/header.component';
import { CidadeComponent } from './pages/cidade/cidade.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateCidadeComponent } from './pages/update-cidade/update-cidade.component';
import { UpdateClienteComponent } from './pages/update-cliente/update-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CidadeComponent,
    ClienteComponent,
    HomeComponent,
    UpdateCidadeComponent,
    UpdateClienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
