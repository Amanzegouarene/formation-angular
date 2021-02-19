import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css']
})
export class ProductInsertComponent implements OnInit {

  insertForm: FormGroup;
  name: FormControl;
  price: FormControl;
  description: FormControl;
  imageUrl: FormControl;

  constructor(
      private fb: FormBuilder, 
      private productService:ProductService,
      private router:Router
    ) { }

  ngOnInit(): void {
    let validImgUrlRegex: string = '^(https?\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,5}(?:\/\S*)?(?:[-A-Za-z0-9+&@#/%?=~_|!:,.;])+\.(?:jpg|jpeg|gif|png))$';

    this.name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.price = new FormControl('', [Validators.required, Validators.min(0), Validators.max(10000000)]);
    this.description = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]);
    this.imageUrl = new FormControl('', [Validators.pattern(validImgUrlRegex)]);
    
    this.insertForm = this.fb.group(
        {
            'name': this.name,
            'price': this.price,
            'description': this.description,
            'imageUrl': this.imageUrl,
            'discontinued': false,
            'fixedPrice': false
        }
    );
  }

  onSubmit(): void{
    let newProduct: Product = this.insertForm.value;
    this
        .productService
        .insertProduct(newProduct)
        .subscribe(
          pr => {
            console.log('Product '+pr.id+' is saved');
            this.productService.initProducts(); // Pousser à réinitialiser la cache, 
            // sinon je ne verrai pas le nouveau produit, la liste des produits étant cachée
            this.router.navigateByUrl('/products'); // naviguer vers le produit

          }, 
          er => console.log(er)
        );
  }

}
