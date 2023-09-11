import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { Router } from '@angular/router';
import { ReviewProduct } from '../../types/review';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss']
})
export class ProductReviewComponent implements OnInit {

  selectedReview!: ReviewProduct;
  modalRef !: NgbModalRef;
  @Input()
  review!: ReviewProduct;
  @Output() notify: EventEmitter<any> = new EventEmitter();
  constructor(private reviewService: ReviewService, public authService:AuthService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  getRange(n: number): number[] {
    return new Array(n);
  }

  
  seeProduct(productId:number){
    this.router.navigate(['full-view-product'],{queryParams:{id:productId}})
  }
  

  viewUser(userId:number){
    this.router.navigate(['user/profile'],{queryParams:{id:userId}})
  }

  openModal(targetModal:any) {
    this.modalRef = this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    });  
    
}

  

  onDeleteClicked(){
    this.reviewService.deleteReviewProduct(this.review.id).subscribe({
      next: (res) =>{
        this.notify.emit();
        this.modalRef.close();
        
      },
      error: (err)=>{
        this.modalRef.close();
        this.notify.emit();
      }
    })
  }

}
