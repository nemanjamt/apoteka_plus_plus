import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../shared/types/service-response';
import { ReportItem } from '../types/report';


@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http: HttpClient) { }

  getReport(startDate:string, endDate:string):Observable<ServiceResponse<ReportItem[]>>{
    let url = "/api/report_orders?";
    if(startDate){
      const date = new Date(startDate);

      const year = date.getFullYear(); 
      const month = date.getMonth() + 1; 
      const day = date.getDate(); 
      url += `start_date[day]=${day}&start_date[month]=${month}&start_date[year]=${year}`;

    }else{
      url += `start_date[day]=${1}&start_date[month]=${1}&start_date[year]=${2000}`;
    }

    if(endDate){
      const date = new Date(endDate);

      const year = date.getFullYear(); 
      const month = date.getMonth() + 1; 
      const day = date.getDate(); 
      if(url[url.length-1]==="?"){
        url += `end_date[day]=${day}&end_date[month]=${month}&end_date[year]=${year}`;
      }else{
        url += `&end_date[day]=${day}&end_date[month]=${month}&end_date[year]=${year}`;
      }
      

    }
    return this.http.get<ServiceResponse<ReportItem[]>>(url,  {
      headers: this.headers,
      responseType: "json",
    });
  }
}
