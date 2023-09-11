import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../shared/types/service-response';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DeliveryRequest, DeliveryRequestInfo } from '../types/delivery_request';

@Injectable({
  providedIn: 'root'
})
export class DeliveryRequestService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http: HttpClient) { }

  createRequest(request:any):Observable<ServiceResponse<DeliveryRequest>>{
    return this.http.post<ServiceResponse<DeliveryRequest>>("/api/delivery_request", request, {
      headers: this.headers,
      responseType: "json",
    });
  }

  getDeliverersRequests(delivererId:number):Observable<ServiceResponse<DeliveryRequest[]>>{
    return this.http.get<ServiceResponse<DeliveryRequest[]>>("/api/delivery_request/deliverer/"+delivererId,{
      headers: this.headers,
      responseType: "json",
    });
  }

  removeDelivererRequest(requestId:number):Observable<ServiceResponse<any>>{
    return this.http.delete<ServiceResponse<any>>("/api/delivery_request/"+requestId,{
      headers: this.headers,
      responseType: "json",
    });
  }

  getAllRequests():Observable<ServiceResponse<DeliveryRequestInfo[]>>{
    return this.http.get<ServiceResponse<DeliveryRequestInfo[]>>("/api/delivery_requests",{
      headers: this.headers,
      responseType: "json",
    });
  }

  approveRequest(requestId:number):Observable<ServiceResponse<any>>{
    return this.http.put<ServiceResponse<any>>("/api/delivery_request/"+requestId,{
      headers: this.headers,
      responseType: "json",
    });
  }
}
