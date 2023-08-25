import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../types/order';
import { OrderWithLoadedItems } from '../../types/full-loaded-order';
import { OrdersService } from '../../services/orders.service';
import { LoadedOrderItem } from '../../types/loaded-order-item';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-full-view-order',
  templateUrl: './full-view-order.component.html',
  styleUrls: ['./full-view-order.component.scss']
})
export class FullViewOrderComponent implements OnInit {

  orderId !:number;
  order !: OrderWithLoadedItems;
  copiedOrder !:OrderWithLoadedItems;
  isValid = true;
  isChanged = false;
  constructor(private router: ActivatedRoute, private orderService: OrdersService, private authService: AuthService) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.orderId = params['id']; // Zamenite 'paramName' sa stvarnim imenom parametra
        this.orderService.findById(this.orderId).subscribe({
          next: (res) =>{this.order = res.data; this.copiedOrder = res.data;},
          error: (err) =>{}
        });
    });
  }

  onQuantityChange(value:any, orderItem: LoadedOrderItem){
    if(value >= 1){
      orderItem.quantity = value;
      this.orderService.changeItemQuantity(orderItem.id, value).subscribe({
        next:(res) =>{ },
        error:(err) => {}
      });
      this.isValid = this.order.items.every(item => item.quantity > 0);
    }else{
      this.isValid = false;
    }
  }
  onChange(){
    this.isChanged = true;
  }
  
  preventNegativeInput(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'e') {
      event.preventDefault();
    }
  }

  getTotal(){
    let total = 0;
    for(let item of this.order.items){
      total += (item.price*item.quantity);
    }
    return total;
  }

  isEditable(){
    return this.authService.isCustomer() && this.order.order_status === 'CREATED' ;
  }

  validChanges(){
    return this.isValid && this.isChanged;
  }

  deleteItem(ordeItemId:number){

  }
  saveChanges(){
    this.orderService.saveChanges(this.order).subscribe({
      next:(res)=>{this.isChanged=false;},
      error:(err)=>{}
    })
  }

}
