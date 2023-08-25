import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  changeItemQuantity(orderItemId:number, quantity:number):Observable<ServiceResponse<OrderItem>>{
    return this.http.put<ServiceResponse<OrderItem>>("/api/order_item/"+orderItemId+"/quantity/"+quantity,  {
      headers: this.headers,
      responseType: "json",
    });
  }

  saveChanges(order: OrderWithLoadedItems):Observable<ServiceResponse<Order>>{
    let changeObject = {delivery: order.delivery, address:order.address, note:order.note};
    return this.http.put<ServiceResponse<Order>>("/api/order/"+order.id,changeObject,  {
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

}
