import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../types/email';
import { ServiceResponse } from '../../shared/types/service-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http: HttpClient) { }

  public sendEmail(emailObject: Email):Observable<ServiceResponse<any>>{
    return this.http.post<ServiceResponse<any>>(`/api/email-send`,emailObject,{
      headers: this.headers,
      responseType: "json",
    }); 
  }
}
