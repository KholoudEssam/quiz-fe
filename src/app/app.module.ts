import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppNgMaterialModule } from './app-ng-material.module';
import { AdminSidenavComponent } from './components/admin-sidenav/admin-sidenav.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminSidenavComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, AppNgMaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
