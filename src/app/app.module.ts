import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ProductsModule, // Important qu'il soit importé avant AppRoutingModule pour avoir 
    // la route ** en dernier 
    AppRoutingModule,
    HttpClientModule, // On le fait une fois n'importe ou dans les modules de mon 
    // appli et il sera itilisé dans les injecteurs
    // Chaque instance de composant possède son injecteur.
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent] // Fait uniquement une fois dans le  module 
  // principal pour définir le component à charger au lancement de l'appli
})
export class AppModule { }
