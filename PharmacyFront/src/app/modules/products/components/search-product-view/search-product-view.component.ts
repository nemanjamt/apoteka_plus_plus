import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-product-view',
  templateUrl: './search-product-view.component.html',
  styleUrls: ['./search-product-view.component.scss']
})
export class SearchProductViewComponent implements OnInit {

  @Input()
  product!: Product;
  constructor(public authService: AuthService, private productService:ProductService, private router: Router) { }

  ngOnInit(): void {
  }
  addInCart(product_id : Number){
    this.productService.addInCart(product_id);
    const addInCartButtons = document.getElementById("add-span-"+product_id);
    const addedInCart = document.getElementById("span-"+product_id) as Element;

    addedInCart.classList.remove("invisible");
    addedInCart.classList.add("visible");
    setTimeout(() => {
      addedInCart.classList.remove("visible");
      addedInCart.classList.add("invisible");
    }, 2000);

  }

  showFullViewProduct(product_id:number){
    // this.router.navigate(["'/full-view-product'+product_id"]);
    this.router.navigate(['/full-view-product'], { queryParams: { id: product_id } });
  }

}
