import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../shared/types/service-response';
import { Order } from '../types/order';
import { OrderWithLoadedItems } from '../types/full-loaded-order';
import { OrderItem } from '../types/orderItem';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http: HttpClient) { }


  getOrders(params:String):Observable<ServiceResponse<Order[]>>{
    return this.http.get<ServiceResponse<Order[]>>("/api/order/search?"+params,  {
      headers: this.headers,
      responseType: "json",
    });
  }

  getOrdersSearch(params:HttpParams):Observable<ServiceResponse<Order[]>>{
    return this.http.get<ServiceResponse<Order[]>>("/api/order/search",  {
      headers: this.headers,
      params:params,
      responseType: "json",
    });
  }

  changeStatus(orderId:number, status:String):Observable<ServiceResponse<Order>>{
    return this.http.put<ServiceResponse<Order>>("/api/order/"+orderId+"/status/"+status,  {
      headers: this.headers,
      responseType: "json",
    });
  }

  deleteOrder(orderId:number):Observable<ServiceResponse<Order>>{
    return this.http.delete<ServiceResponse<Order>>("/api/order/"+orderId,  {
      headers: this.headers,
      responseType: "json",
    });
  }

  check_user_order_product(userId:number, productId:number):Observable<ServiceResponse<Order>>{
    return this.http.get<ServiceResponse<Order>>("/api/order/user_ordered_product/"+userId+"/"+productId,  {
      headers: this.headers,
      responseType: "json",
    });
  }
  changeItemQuantity(orderItemId:number, quantity:number):Observable<ServiceResponse<OrderItem>>{
    return this.http.put<ServiceResponse<OrderItem>>("/api/order_item/"+orderItemId+"/quantity/"+quantity,  {
      headers: this.headers,
      responseType: "json",
    });
  }

  saveChanges(order_id:number, changeObject: any):Observable<ServiceResponse<Order>>{
    
    return this.http.put<ServiceResponse<Order>>("/api/order/"+order_id,changeObject,  {
      headers: this.headers,
      responseType: "json",
    });
  }

  createOrder(objectRequest:any):Observable<ServiceResponse<Order>>{
    return this.http.post<ServiceResponse<Order>>("/api/order", objectRequest, {
      headers: this.headers,
      responseType: "json",
    });
  }
  deleteOrderItem(orderItemId:number):Observable<ServiceResponse<Order>>{
    return this.http.delete<ServiceResponse<Order>>("/api/order_item/"+orderItemId,  {
      headers: this.headers,
      responseType: "json",
    });
  }
  findById(orderId:number):Observable<ServiceResponse<OrderWithLoadedItems>>{
    return this.http.get<ServiceResponse<OrderWithLoadedItems>>("/api/order/"+orderId,  {
      headers: this.headers,
      responseType: "json",
    });
  }
  formatDateTime(dateTimeString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    const formattedDate = new Intl.DateTimeFormat('default', options).format(
      new Date(dateTimeString)
    );
    const [time, date] = formattedDate.split(', ');

    return `${time} ${date.replace(/\//g, '.')}`;
  }

  getDelivererPossibleStates(): String[]{
    return ["DELIVERY IN PROGRESS", "OVER TAKEN", "ASSIGNED","DELIVERED"];
  }

  getAdminPossibleStates():String[]{
    return ["CREATED","ACCEPTED","REJECTED",
    "READY","ASSIGNED","OVER TAKEN","DELIVERY IN PROGRESS","DELIVERED","CANCELLED","FINISHED"];
  }

  getCustomerPossibleStates():String[]{
    return ["CANCELLED"]
  }

  getPharmacistsPossibleStates():String[]{
    return ["CREATED","ACCEPTED","REJECTED",
    "READY","ASSIGNED","OVER TAKEN","DELIVERY IN PROGRESS","DELIVERED","CANCELLED","FINISHED"];
  }

}
