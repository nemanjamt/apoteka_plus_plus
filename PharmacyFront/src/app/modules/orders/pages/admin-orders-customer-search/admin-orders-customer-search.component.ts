import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../types/order';
import { BasicUserData } from 'src/app/modules/user/types/userData';
import { HttpParams } from '@angular/common/http';
import { UserService } from 'src/app/modules/user/services/user.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-admin-orders-customer-search',
  templateUrl: './admin-orders-customer-search.component.html',
  styleUrls: ['./admin-orders-customer-search.component.scss']
})
export class AdminOrdersCustomerSearchComponent implements OnInit {

  form!: FormGroup;
  orders!: Order[];
  customer!: BasicUserData;
  httpParams: HttpParams;
  isExpanded!: boolean;
  selectedFilterStatus : string = "";
  possible_options !: String[] ;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private orderService: OrdersService
  ) {
    this.httpParams = new HttpParams();
    this.possible_options = orderService.getAdminPossibleStates();
  }

  createForm() {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  search() {
    this.userService
      .findBasicUserByUsername(this.form.value.username)
      .subscribe({
        next: (res) => {
          this.customer = res.data;
          if (this.customer) {
            this.httpParams = this.httpParams.set(
              'user_id',
              this.customer.id
            );
          }
          this.orderService.getOrdersSearch(this.httpParams).subscribe({
            next: (res) => {this.orders = res.data;}
          })
        },
        error: (err) => {},
      });
  }

  toggleFilter(){
    this.isExpanded = !this.isExpanded;
  }

  loadData(){
    if (this.customer) {
      this.httpParams = this.httpParams.set(
        'user_id',
        this.customer.id
      );
      this.orderService.getOrdersSearch(this.httpParams).subscribe({
        next: (res) => {this.orders = res.data;}
      })
    }
  }

  onFilterStatusChange(){
    if (this.customer && this.selectedFilterStatus !=="") {
      this.httpParams = this.httpParams.set(
        'user_id',
        this.customer.id
      );
      this.httpParams = this.httpParams.set("order_status",this.selectedFilterStatus);
      this.orderService.getOrdersSearch(this.httpParams).subscribe({
        next: (res) => {this.orders = res.data;}
      })
    }else if(this.customer && this.selectedFilterStatus === ""){
      this.httpParams = this.httpParams.set(
        'user_id',
        this.customer.id
      );
      this.httpParams = this.httpParams.delete("order_status");
      this.orderService.getOrdersSearch(this.httpParams).subscribe({
        next: (res) => {this.orders = res.data;}
      })
    }
  }

}
