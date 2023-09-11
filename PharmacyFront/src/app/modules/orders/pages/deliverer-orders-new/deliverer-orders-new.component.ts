import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../../types/order';
import { HttpParams } from '@angular/common/http';
import { DeliveryRequest } from 'src/app/modules/deliverer-request/types/delivery_request';
import { DeliveryRequestService } from 'src/app/modules/deliverer-request/services/delivery-request.service';


@Component({
  selector: 'app-deliverer-orders-new',
  templateUrl: './deliverer-orders-new.component.html',
  styleUrls: ['./deliverer-orders-new.component.scss'],
})
export class DelivererOrdersNewComponent implements OnInit {
  searchParams: String = '';
  orders?: Order[];
  httpParams: HttpParams;
  choosedOrderId!: number;
  modalRef!: NgbModalRef;
  deliverer_requests!: DeliveryRequest[];
  constructor(
    public authService: AuthService,
    private orderService: OrdersService,
    private router: Router,
    private modalService: NgbModal,
    private deliveryRequestService: DeliveryRequestService
  ) {
    this.httpParams = new HttpParams();
  }

  ngOnInit(): void {
    this.httpParams = this.httpParams.set('delivery', 'true');
    this.httpParams = this.httpParams.set('order_status', 'ACCEPTED');
    this.orderService.getOrdersSearch(this.httpParams).subscribe({
      next: (res) => {
        this.orders = res.data;
      },
      error: (err) => {},
    });
    this.getDeliveryRequests();
  }

  getDeliveryRequests() {
    this.deliveryRequestService
      .getDeliverersRequests(this.authService.getCurrentlyLoggedId())
      .subscribe({
        next: (res) => {
          this.deliverer_requests = res.data;
        },
        error: (err) => {},
      });
  }

  formatDateTime(dateTimeString: string): string {
    return this.orderService.formatDateTime(dateTimeString);
  }
  onDetailedView(orderId: number) {
    this.router.navigate(['orders/full-view-order'], {
      queryParams: { id: orderId },
    });
  }

  clickCreateRequests(orderId: number) {
    let requestObj = {
      order_id: orderId,
      deliverer_id: this.authService.getCurrentlyLoggedId(),
    };
    this.deliveryRequestService.createRequest(requestObj).subscribe({
      next: (res) => {
        this.getDeliveryRequests();
      },
      error: (err) => {},
    });
  }

  clickRemoveRequest(orderId: number) {
    let deliveryRequest = this.deliverer_requests.find(
      (request) => request.order_id === orderId
    );
    if (deliveryRequest) {
      this.deliveryRequestService
        .removeDelivererRequest(deliveryRequest.id)
        .subscribe({
          next: (res) => {this.getDeliveryRequests();},
          error: (err) => {},
        });
    }
  }

  delivererAlreadyCreateRequest(orderId: number): boolean {
    return this.deliverer_requests.some(
      (request) => request.order_id === orderId
    );
  }
}
