import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import { Order } from '../../types/order';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {


  @Input()
  orders ?: Order[];
  status_options : String[] = []
  selectedStatus!: string; // Inicijalizujte po potrebi

  choosedOrderId !: number;
  modalRef!: NgbModalRef;
  @Output()
  notify: EventEmitter<any> = new EventEmitter();

  constructor(
    public authService: AuthService,
    private orderService: OrdersService,
    private router: Router,
    private modalService: NgbModal,

  ) {}

  ngOnInit(): void {
    this.checkStatusOptions();
  }

  

  changedStatus(order:Order){
    this.orderService.changeStatus(order.id, order.order_status).subscribe({
      next:(res) =>{
        this.notify.emit();
      },
      error: (err)=>{

      }
    });
  }
  checkStatusOptions(){
    this.status_options = ["CREATED","ACCEPTED","REJECTED",
    "READY","FINISHED","DELIVERY IN PROGRESS","CANCELLED","DELIVERED","ASSIGNED", "OVER TAKEN"];
  }
  

  formatDateTime(dateTimeString: string): string {
    return this.orderService.formatDateTime(dateTimeString);
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
        this.notify.emit();
      },
      error: (err) =>{

      }
    });
  }
  
  onDetailedView(orderId:number){
    this.router.navigate(['orders/full-view-order'], { queryParams: { id: orderId } });
  }

}
