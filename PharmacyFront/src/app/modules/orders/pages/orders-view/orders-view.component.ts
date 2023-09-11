import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Order } from '../../types/order';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.scss'],
})
export class OrdersViewComponent implements OnInit {
  searchParams: String = '';
  orders ?: Order[];
  status_options : String[] = []
  selectedStatus!: string; // Inicijalizujte po potrebi

  choosedOrderId !: number;
  modalRef!: NgbModalRef;
  constructor(
    public authService: AuthService,
    private orderService: OrdersService,
    private router: Router,
    private modalService: NgbModal,

  ) {}

  ngOnInit(): void {
    this.checkSearchParams();
    this.checkStatusOptions();
    this.loadOrders();
    
  }

  loadOrders(){
    this.orderService.getOrders(this.searchParams).subscribe({
      next: (res) => {
        this.orders = res.data;
        console.log(this.orders);
      },
      error: (err) => {},
    });
  }

  changedStatus(order:Order){
    console.log("Promijenjen status");
    console.log(order);
    console.log(this.selectedStatus);
    this.orderService.changeStatus(order.id, order.order_status).subscribe({
      next:(res) =>{
        order = res.data;
      },
      error: (err)=>{

      }
    });
  }
  checkStatusOptions(){
    if(this.authService.isDeliverer()){
      this.status_options = ["DELIVERY IN PROGRESS","DELIVERED"];
    }else if(this.authService.isPharmacist() || this.authService.isAdmin()){
      this.status_options = ["CREATED","ACCEPTED","REJECTED",
      "READY","FINISHED","DELIVERY IN PROGRESS","CANCELLED","DELIVERED","ASSIGNED", "OVER TAKEN"];
    }else{
      this.status_options = ["CANCELLED"];
    }
  }
  checkSearchParams() {
    if (this.authService.isDeliverer()) {
      this.searchParams +=
        'deliverer_id=' + this.authService.getCurrentlyLoggedId() + '&';
      console.log(this.searchParams);
    } else if (this.authService.isCustomer()) {
      this.searchParams +=
        'user_id=' + this.authService.getCurrentlyLoggedId() + '&';
      console.log(this.searchParams);
    }
  }

  formatDateTime(dateTimeString: string): string {
    return this.orderService.formatDateTime(dateTimeString);
  }

  canDelete(order:Order){
    if(this.authService.isCustomer()){
      return order.order_status === "CREATED";
    }else if(this.authService.isAdmin() || this.authService.isPharmacist()){
      return true;
    }
    return false;
  }


  openModal(target:any, orderId:number){
    this.modalRef = this.modalService.open(target,{
      centered: true,
      backdrop: 'static'
    });
    this.choosedOrderId = orderId;
  }

  deleteOrder(){
    this.modalRef.close();
    this.orderService.deleteOrder(this.choosedOrderId).subscribe({
      next: (res) =>{
        this.orders = this.orders?.filter(order => order.id != this.choosedOrderId);
        
      },
      error: (err) =>{

      }
    });
  }
  onDetailedView(orderId:number){
    this.router.navigate(['orders/full-view-order'], { queryParams: { id: orderId } });
  }
}
