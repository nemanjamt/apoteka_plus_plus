import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../types/order';
import { UserService } from 'src/app/modules/user/services/user.service';
import {
  BasicUserData,
  UserDataResponse,
} from 'src/app/modules/user/types/userData';
import { OrdersService } from '../../services/orders.service';
import { OrderWithLoadedItems } from '../../types/full-loaded-order';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-admin-orders-deliverer-search',
  templateUrl: './admin-orders-deliverer-search.component.html',
  styleUrls: ['./admin-orders-deliverer-search.component.scss'],
})
export class AdminOrdersDelivererSearchComponent implements OnInit {
  form!: FormGroup;
  orders!: Order[];
  deliverer!: BasicUserData;
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
          this.deliverer = res.data;
          if (this.deliverer) {
            this.httpParams = this.httpParams.set(
              'deliverer_id',
              this.deliverer.id
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
    if (this.deliverer) {
      this.httpParams = this.httpParams.set(
        'deliverer_id',
        this.deliverer.id
      );
      this.orderService.getOrdersSearch(this.httpParams).subscribe({
        next: (res) => {this.orders = res.data;}
      })
    }
  }

  onFilterStatusChange(){
    if (this.deliverer && this.selectedFilterStatus !=="") {
      this.httpParams = this.httpParams.set(
        'deliverer_id',
        this.deliverer.id
      );
      this.httpParams = this.httpParams.set("order_status",this.selectedFilterStatus);
      this.orderService.getOrdersSearch(this.httpParams).subscribe({
        next: (res) => {this.orders = res.data;}
      })
    }else if(this.deliverer && this.selectedFilterStatus === ""){
      this.httpParams = this.httpParams.set(
        'deliverer_id',
        this.deliverer.id
      );
      this.httpParams = this.httpParams.delete("order_status");
      this.orderService.getOrdersSearch(this.httpParams).subscribe({
        next: (res) => {this.orders = res.data;}
      })
    }
  }
}
