import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../types/product';
import { ProductService } from '../../services/product.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  constructor(private productService: ProductService, public authService:AuthService) { }

  @Input()
  productId!: number;
  product!:Product;
  ngOnInit(): void {
    this.get_product();
  }

  get_product(){
    if(!this.productId){
      return;
    }
    this.productService.findProductById(this.productId).subscribe({
      next: (res) =>{
        this.product = res.data;
      },
      error: (err) =>{

      }
    })
  }

}
