import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasicReviewDeliverer, ReviewProduct, ReviewDeliverer } from '../../types/review';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-deliverer-review',
  templateUrl: './deliverer-review.component.html',
  styleUrls: ['./deliverer-review.component.scss'],
})
export class DelivererReviewComponent implements OnInit {

  @Output() notify: EventEmitter<any> = new EventEmitter();

  @Input()
  review!: ReviewDeliverer | BasicReviewDeliverer;
  
  @Input()
  title!:string;

  @Input()
  seeOrder!:boolean;
  constructor(public authService: AuthService, private router: Router, private modalService: NgbModal, private reviewService: ReviewService) {}

  private modalRef!:NgbModalRef;
  ngOnInit(): void {}

  hasName(
    review: ReviewDeliverer | BasicReviewDeliverer
  ): review is ReviewDeliverer {
    return (review as ReviewDeliverer).first_name !== undefined;
  }
  getRange(n: number): number[] {
    return new Array(n);
  }

  onEditClicked(review_id:number){
    this.router.navigate(['reviews/edit-review'],{queryParams:{reviewId:review_id,deliverer:true}})
  }


  openModal(target: any, review: ReviewDeliverer | BasicReviewDeliverer) {
    this.modalRef = this.modalService.open(target, {
      centered: true,
      backdrop: 'static',
    });
    ;
  }

  deleteClicked(){
    this.reviewService.deleteReviewDeliverer(this.review.id).subscribe({
      next: (res)=>{this.notify.emit();},
      error: (err) =>{}
    })
    this.modalRef.close();
  }

  reportClicked(review:ReviewDeliverer | BasicReviewDeliverer){
    this.reviewService.reportReviewDeliverer(review.id).subscribe({
      next: (res) =>{this.review.reported = true;},
      error: (err) =>{}
    })
  }
  deleteReportClicked(review: ReviewDeliverer | BasicReviewDeliverer){
    this.reviewService.deleteReportReviewDeliverer(review.id).subscribe({
      next: (res) => {this.review.reported = false;},
      error: (err) => {}
    })
  }

  viewUser(userId:number){
    this.router.navigate(['user/profile'],{queryParams:{id:userId}})
  }

  clickSeeOrder(orderId:number){
    this.router.navigate(['orders/full-view-order'], {queryParams:{id:orderId}});
  }
}
