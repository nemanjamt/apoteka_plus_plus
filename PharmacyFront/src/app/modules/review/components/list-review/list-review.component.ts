import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReviewProduct } from '../../types/review';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-review',
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.scss']
})
export class ListReviewComponent implements OnInit {

  @Output() notify: EventEmitter<any> = new EventEmitter();
  @Input()
  reviews!: ReviewProduct[];
  selectedReview!: ReviewProduct;
  modalRef !: NgbModalRef;
  constructor(public authService: AuthService, private router: Router,
     private reviewService: ReviewService, private modalService: NgbModal) { }

  ngOnInit(): void {

  }

  getRange(n: number): number[] {
    return new Array(n);
  }

  onEditClicked(reviewId:number){
    this.router.navigate(['reviews/edit-review'], { queryParams: { reviewId: reviewId } });
  }

  deleteReportClicked(review:ReviewProduct){
    this.reviewService.deleteReportReviewProduct(review.id).subscribe({
      next: (res)=>{review.reported = false;},
      error: (err)=>{}
    })
  }

  openModal(targetModal:any, review:ReviewProduct) {
    this.modalRef = this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    });  
    this.selectedReview = review;
}

  reportClicked(review:ReviewProduct){
    this.reviewService.reportReviewProduct(review.id).subscribe({
      next: (res)=>{review.reported = true;},
      error: (err)=>{}
    })
  }

  onDeleteClicked(){
    this.reviewService.deleteReviewProduct(this.selectedReview.id).subscribe({
      next: (res) =>{
        this.reviews = this.reviews.filter(review => review.id != this.selectedReview.id);
        this.modalRef.close();
        this.notify.emit();
      },
      error: (err)=>{
        this.modalRef.close();
      }
    })
  }

}
