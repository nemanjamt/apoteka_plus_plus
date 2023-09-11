import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {

  @Output() notify: EventEmitter<any> = new EventEmitter();
  @Input()
  productId !:number;
  @Input()
  productReview!: boolean;
  @Input()
  delivererReview !: boolean;
  @Input()
  orderId !:number;
  @Input()
  title !: string;
  @Input()
  delivererId !:number | null;

  reviewForm!: FormGroup;
  constructor(private fb: FormBuilder, private reviewService: ReviewService, private authService: AuthService) {
    this.reviewForm = this.fb.group({
      mark: [null, [Validators.min(1), Validators.required]],
      comment: [null, [Validators.min(2), Validators.required]],
    });
   }


  ngOnInit(): void {
  }

  markChange(value:number){
    this.reviewForm.setValue({
      mark:value,
      comment:this.reviewForm.value.comment
    })
  }

  createReview(){
    if(this.productReview){
      this.createReviewProduct();
    }else if(this.delivererReview){
      this.createReviewDeliverer();
    }
  }
  createReviewProduct(){
    let newReview = {
      comment: this.reviewForm.value.comment,
      mark: this.reviewForm.value.mark,
      product_id: Number(this.productId) ,
      user_id: this.authService.getCurrentlyLoggedId()
    };
    this.reviewService.createReviewProduct(newReview).subscribe({
      next: (res)=>{this.notify.emit();},
      error: (err)=>{}
    });
  }

  createReviewDeliverer(){
    let newReview = {
      comment: this.reviewForm.value.comment,
      mark: this.reviewForm.value.mark,
      product_id: Number(this.productId) ,
      order_id: Number(this.orderId),
      user_id: this.authService.getCurrentlyLoggedId(),
      deliverer_id:this.delivererId
    };
    this.reviewService.createReviewDeliverer(newReview).subscribe({
      next: (res)=>{this.notify.emit();},
      error: (err)=>{}
    });
  }

}
