import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subscriber } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
  /* ,providers: [ProductService] : Si je veux avoir le service dans l'injecteur du
    component ProductListComponent*/
})
export class ProductListComponent implements OnInit {

  title = 'Products';
  // products: Product[];
  selectedProduct: Product;

  products$: Observable<Product[]>;
  errorMesage: string;

  // Pagination 
  pageSize = 5;
  start = 0;
  end=this.pageSize;
  currentPageNumber = 1;
  

  nextPage(){
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.currentPageNumber ++;
    this.selectedProduct = null;
  }
  
  previousPage(){
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.currentPageNumber --;
    this.selectedProduct = null;
  }

  constructor(private productService: ProductService) {
    /* Le faire ici ralentira le chargement du composant, le faire plutôt dans ngOnInit  */
    // this.products = this.productService.getProducts();
  }
  
  ngOnInit(): void {
    this.products$ = this
                          .productService
                          .products$
                          .pipe(
                            catchError(
                              er => {
                                this.errorMesage = er.message;
                                return EMPTY;
                              }
                            )
                          );
/*     this
    .productService
    .products$
    .pipe(
      map (prs => prs
        .filter(pr => !pr.name.toUpperCase().includes("TEST")
        && pr.price>20000))
    )
    // Le fait de faire un subscribe ici, déclenche l'appel du service http dans
    // le service: Une alternative pourrait se faire dans le html
    .subscribe(
      result => this.products = result

    ); */
  }

  // Appeler quand le composant est détruit (à la navigation par exemple)
  ngOnDestroy(): void{
    // Il ne faut pas oublier de gérer la désincription

  }
  
  onSelect(product: Product): void{
    this.selectedProduct = product;
  }

}
