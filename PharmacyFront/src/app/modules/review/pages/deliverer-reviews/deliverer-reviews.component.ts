import { Component, OnInit } from '@angular/core';
import { ReviewDeliverer } from '../../types/review';
import { ReviewService } from '../../services/review.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/modules/user/services/user.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deliverer-reviews',
  templateUrl: './deliverer-reviews.component.html',
  styleUrls: ['./deliverer-reviews.component.scss']
})
export class DelivererReviewsComponent implements OnInit {
  delivererReviews!: ReviewDeliverer[];
  form: FormGroup;
  delivererId!: number;
  constructor(private reviewService: ReviewService, private activatedRouter:ActivatedRoute, public authService:AuthService, private fb: FormBuilder, private userService: UserService) {
    this.form = fb.group({
      username: [null, [Validators.required, Validators.minLength(2)]]
    });
   }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      this.delivererId = params['id'];
      this.getDelivererReviewsById(this.delivererId);
    });
  }

  search(){
    this.delivererReviews = [];
    this.userService.findBasicUserByUsername(this.form.value.username).subscribe({
      next: (res)=>{
        this.getDelivererReviewsById(res.data.id);
      },
      error: (err)=>{}
    });
    
  }

  getDelivererReviewsById(id:number){
    this.reviewService.getReviewsByDelivererId(id).subscribe({
      next : (res) => {this.delivererReviews = res.data;},
      error: (err) =>{}
    })
  }

}
