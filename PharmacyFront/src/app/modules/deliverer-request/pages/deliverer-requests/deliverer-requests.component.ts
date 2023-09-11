import { Component, OnInit } from '@angular/core';
import { DeliveryRequestInfo } from '../../types/delivery_request';
import { DeliveryRequestService } from '../../services/delivery-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deliverer-requests',
  templateUrl: './deliverer-requests.component.html',
  styleUrls: ['./deliverer-requests.component.scss'],
})
export class DelivererRequestsComponent implements OnInit {
  requests!: DeliveryRequestInfo[];
  constructor(
    private deliveryRequestService: DeliveryRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests(){
    this.deliveryRequestService.getAllRequests().subscribe({
      next: (res) => {
        this.requests = res.data;
      },
      error: (err) => {},
    });
  }
  onDetailedView(orderId: number) {
    this.router.navigate(['orders/full-view-order'], {
      queryParams: { id: orderId },
    });
  }

  clickRemoveRequest(requestId: number) {
    this.deliveryRequestService
      .removeDelivererRequest(requestId)
      .subscribe({
        next: (res) => {
          this.getRequests();
        },
        error: (err) => {},
      });
  }

  clickAproveRequest(requestId:number){
    this.deliveryRequestService.approveRequest(requestId).subscribe({
      next: (res) =>{
        this.getRequests();
      },
      error: (err) => {}
    })
  }

  viewProfile(delivererId:number){
    this.router.navigate(['user/profile'], {queryParams:{id:delivererId}});
  }
}
