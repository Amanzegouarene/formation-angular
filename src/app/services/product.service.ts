import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../products/product.interface';
/* import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, shareReplay, tap, map } from 'rxjs/operators'; */

@Injectable({
  providedIn: 'root'
})
/* @Injectable() si je veux le mettre dans l'injecteur d'un component  */

export class ProductService {
  private baseUrl = environment.apiUrl;

  /* Signe $ à la fin du nom pour dire que c'est un Observable: 
  Juste une convention de nommage */
  products$: Observable<Product[]>;

  // HttpClient permet de faire des appels aJax
  constructor(private http: HttpClient) { 
    /* à ce niveau là l'appel ne fera rien du tout, 
    quand un composant fera le subscribe, la méthode sera déclenchée (le http.get ...) */
    this.initProducts();
  }

/* tap: faire une operation a part, qui n'a rien à voir,
    comprendre tap(data => console.log) 
    console. table */
  initProducts(){ 
    let url:string = this.baseUrl + `?$orderby=ModifiedDate%20desc`;
    this.products$ = this
                        .http
                        .get<Product[]>(url)
                        .pipe(
                          delay(1500), 
                          tap(console.table),
                          // Mise en cache du résultat
                          shareReplay(), // pour éviter de faire plusieurs appels
                          catchError(er => {
                            console.error(er);
                            return throwError(er);
                          })
                        );
  }


  insertProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, newProduct);
  }

  deleteProduct(productId: number): Observable<any>{
    return this.http.delete<number>(this.baseUrl + productId);
  }

}
