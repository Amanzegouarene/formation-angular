import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './shared/admin.component';
import { ContactComponent } from './shared/contact.component';
import { ErrorComponent } from './shared/error.component';
import { HomeComponent } from './shared/home.component';

const routes: Routes = [
  // L'ordre des route est important (de haut en bas!), 
  // le ** est le default ! si tout échouent
  { path: '', redirectTo:'/home', pathMatch:'full'}, //full: pour dire qu'il faut matcher l'url en entier 
  { path: 'home', component: HomeComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'admin', component: AdminComponent},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
