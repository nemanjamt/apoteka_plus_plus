import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../shared/types/service-response';
import { BasicUserData, UserData, UserDataResponse } from '../types/userData';
import { BlockUser } from '../types/blockUser';
import { ChangeUserData } from '../types/ChangeUserData';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http: HttpClient) { }

  findUserById(id:number):Observable<ServiceResponse<UserDataResponse>>{
    return this.http.get<ServiceResponse<UserDataResponse>>("/api/users/"+id,{
      headers: this.headers,
      responseType: "json",
    });
  }

  changeUserData(id:number, data: ChangeUserData):Observable<ServiceResponse<UserDataResponse>>{
    return this.http.put<ServiceResponse<UserDataResponse>>("/api/users/"+id, data, {
      headers: this.headers,
      responseType: "json",
    });
  }

  blockUser(id:number, reason:BlockUser):Observable<ServiceResponse<any>>{
    return this.http.put<ServiceResponse<any>>("/api/users/block/"+id,reason,{
      headers: this.headers,
      responseType: "json"
    });
  }

  findBasicUserById(id:number):Observable<ServiceResponse<BasicUserData>>{
    return this.http.get<ServiceResponse<BasicUserData>>(`/api/user/basic?id=${id}`,{
      headers: this.headers,
      responseType: "json",
    });
  }

  findBasicUserByUsername(username:string):Observable<ServiceResponse<BasicUserData>>{
    return this.http.get<ServiceResponse<BasicUserData>>(`/api/user/basic?username=${username}`,{
      headers: this.headers,
      responseType: "json",
    });
  }

  findUserByUsername(username:string):Observable<ServiceResponse<UserDataResponse>>{
    return this.http.get<ServiceResponse<UserDataResponse>>(`/api/user/basic-username/${username}`,{
      headers: this.headers,
      responseType: "json",
    });
  }

  createUser(requestObject: any):Observable<ServiceResponse<UserDataResponse>>{
    return this.http.post<ServiceResponse<UserDataResponse>>(`/api/users`,requestObject,{
      headers: this.headers,
      responseType: "json",
    }); 
  }

  getPharmacists():Observable<ServiceResponse<UserDataResponse[]>>{
    return this.http.get<ServiceResponse<UserDataResponse[]>>("/api/user/pharmacists",{
      headers: this.headers,
      responseType: "json",
    });
  }

  getDeliverers():Observable<ServiceResponse<UserDataResponse[]>>{
    return this.http.get<ServiceResponse<UserDataResponse[]>>("/api/user/deliverers",{
      headers: this.headers,
      responseType: "json",
    });
  }

  deleteUser(userId:number):Observable<ServiceResponse<any>>{
    return this.http.delete<ServiceResponse<any>>(`/api/users/${userId}`,{
      headers: this.headers,
      responseType: "json",
    });
  }
}
