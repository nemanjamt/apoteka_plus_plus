import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { ReviewDeliverer, ReviewProduct } from '../../types/review';

@Component({
  selector: 'app-reported-reviews',
  templateUrl: './reported-reviews.component.html',
  styleUrls: ['./reported-reviews.component.scss']
})
export class ReportedReviewsComponent implements OnInit {

  delivererReviews!: ReviewDeliverer[];
  productsReviews !: ReviewProduct[];
  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.reviewService.getProductReviewsReported().subscribe({
      next : (res) => {this.productsReviews = res.data;},
      error: (err) =>{}
    })
    this.reviewService.getDelivererReviewsReported().subscribe({
      next : (res) => {this.delivererReviews = res.data;},
      error: (err) =>{}
    })
  }

  handleNotifications(){
    this.loadData();
  }

}
