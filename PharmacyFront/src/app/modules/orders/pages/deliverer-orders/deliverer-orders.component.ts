import { Component, OnInit } from '@angular/core';
import { Order } from '../../types/order';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OrdersService } from '../../services/orders.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-deliverer-orders',
  templateUrl: './deliverer-orders.component.html',
  styleUrls: ['./deliverer-orders.component.scss']
})
export class DelivererOrdersComponent implements OnInit {

  searchParams: String = '';
  orders ?: Order[];
  status_options !: String[] ;
  possible_options !: String[];
  selectedStatus!: string; 
  selectedFilterStatus : string = "";
  isExpanded: boolean = false;
  choosedOrderId !: number;
  modalRef!: NgbModalRef;
  httpSearchParams!: HttpParams;
  constructor(public authService: AuthService,
    private orderService: OrdersService,
    private router: Router,
    private modalService: NgbModal,) {
      this.possible_options = this.orderService.getAdminPossibleStates();
      this.status_options = this.orderService.getDelivererPossibleStates();
     }

    ngOnInit(): void {
      this.checkSearchParams();
      this.loadOrders();
    }
  
    loadOrders(){
      this.orderService.getOrdersSearch(this.httpSearchParams).subscribe({
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
    checkStatusOptions(order: Order){

      return  this.orderService.getDelivererPossibleStates().filter(status => status != order.order_status);

    }
    checkSearchParams() {
        this.httpSearchParams = new HttpParams();
        this.httpSearchParams = this.httpSearchParams.set("deliverer_id",this.authService.getCurrentlyLoggedId());
        // this.searchParams +=
        //   'deliverer_id=' + this.authService.getCurrentlyLoggedId() + '&';
        // console.log(this.searchParams);
      
    }
  
    formatDateTime(dateTimeString: string): string {
      return this.orderService.formatDateTime(dateTimeString);
    }
  
    onFilterStatusChange(){
      if(this.selectedFilterStatus === ""){
        this.httpSearchParams = this.httpSearchParams.delete("order_status");
      }else{
        this.httpSearchParams = this.httpSearchParams.set("order_status",this.selectedFilterStatus);
      }

      this.loadOrders();
    }
  
    onDetailedView(orderId:number){
      this.router.navigate(['orders/full-view-order'], { queryParams: { id: orderId } });
    }
    toggleFilter(){
      this.isExpanded = !this.isExpanded;
    }

}
