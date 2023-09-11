import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ProductService } from '../../services/product.service';
import { OrdersService } from 'src/app/modules/orders/services/orders.service';
import { ReviewProduct } from 'src/app/modules/review/types/review';
import { ReviewService } from 'src/app/modules/review/services/review.service';

@Component({
  selector: 'app-full-view-product',
  templateUrl: './full-view-product.component.html',
  styleUrls: ['./full-view-product.component.scss']
})
export class FullViewProductComponent implements OnInit {

  productId !:number;
  isOrderedProduct!:boolean;
  alreadyCreateComment !:boolean;
  reviews!: ReviewProduct[];
  constructor(private router: ActivatedRoute, private authService: AuthService, private orderService: OrdersService,
     private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.productId = params['id']; // Zamenite 'paramName' sa stvarnim imenom parametra
      // console.log(paramName); // Ovde možete raditi sa vrednošću parametra
      this.findReviews();
      this.checkUserOrderProduct();
      this.checkUserAlreaedyCreateComment();
      
    });
  }
  checkUserOrderProduct(){
    this.orderService.check_user_order_product(this.authService.getCurrentlyLoggedId(), this.productId).subscribe({
      next:(res)=>{this.isOrderedProduct = true;},
      error: (err)=>{this.isOrderedProduct=false;}
    })
  }
  checkUserAlreaedyCreateComment(){
    this.reviewService.checkIfUserAlreadyCreateReviewProduct(this.authService.getCurrentlyLoggedId(), this.productId).subscribe({
      next:(res)=>{this.alreadyCreateComment = true;},
      error:(err)=>{this.alreadyCreateComment=false;}
    })
  }

  canCreateReview(){
    return this.authService.isLoggedIn() && this.isOrderedProduct && !this.alreadyCreateComment;
  }

  findReviews(){
    this.reviewService.findReviewsProductByProductId(this.productId).subscribe({
      next:(res)=>{this.reviews = res.data;console.log(this.reviews);},
      error:(err)=>{}
    })
  }
  handleNotification(){
    this.findReviews();
    this.checkUserOrderProduct();
    this.checkUserAlreaedyCreateComment();
  }

}
