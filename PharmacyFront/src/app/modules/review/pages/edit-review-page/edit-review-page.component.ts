import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  BasicReviewDeliverer, BasicReviewProduct } from '../../types/review';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-review-page',
  templateUrl: './edit-review-page.component.html',
  styleUrls: ['./edit-review-page.component.scss']
})
export class EditReviewPageComponent implements OnInit {

  reviewId!:number;
  reviewForm!: FormGroup;
  review!: BasicReviewProduct | BasicReviewDeliverer;
  selectedMark:number = 4;
  isDeliverer !: boolean; 
  constructor(private fb: FormBuilder, private reviewService: ReviewService, private activatedRouter: ActivatedRoute, private location : Location) {
    this.reviewForm = this.fb.group({
      mark: [0, [Validators.min(1), Validators.required]],
      comment: ["", [Validators.min(2), Validators.required]],
    });
   }


  ngOnInit(): void {

    this.activatedRouter.queryParams.subscribe(params => {
      this.reviewId = params['reviewId']; // Zamenite 'paramName' sa stvarnim imenom parametra
      this.isDeliverer = params['deliverer']
      if(!this.isDeliverer){
        this.reviewService.findProductReviewById(this.reviewId).subscribe({
          next: (res)=>{this.review = res.data;
                        this.reviewForm.setValue({
                          mark:this.review.mark,
                          comment: this.review.comment
                        });
                        
          },
          error: (err)=>{}
        });
      }else{
        this.reviewService.findDelivererReviewById(this.reviewId).subscribe({
          next: (res)=>{this.review = res.data;
                        this.reviewForm.setValue({
                          mark:this.review.mark,
                          comment: this.review.comment
                        });
                        
          },
          error: (err)=>{}
        });
      }
      


    });
  }
  markChange(value:number){
    this.reviewForm.setValue({
      mark:value,
      comment:this.reviewForm.value.comment
    })
    console.log("123321");
    console.log(value);
  }

  changeReview(){
    let newReview = {
      comment: this.reviewForm.value.comment,
      mark: this.reviewForm.value.mark,
    };
    if(!this.isDeliverer){
      this.reviewService.changeReviewProduct(this.reviewId, newReview).subscribe({
        next: (res)=>{ this.review = res.data; this.location.back();},
        error: (err)=>{}
      });
    }else{
      this.reviewService.changeReviewDeliverer(this.reviewId, newReview).subscribe({
        next: (res)=>{ this.review = res.data; this.location.back();},
        error: (err)=>{}
      });
    }
    
  }
}
