import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceResponse } from '../../shared/types/service-response';
import {  BasicReviewDeliverer, BasicReviewProduct, ReviewDeliverer, ReviewProduct } from '../types/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http: HttpClient) { }


  reportReviewProduct(reviewId:number):Observable<ServiceResponse<BasicReviewProduct>>{
    return this.http.put<ServiceResponse<BasicReviewProduct>>("/api/review_product/report/"+reviewId , {
      headers: this.headers,
      responseType: "json",
    });
  }

  reportReviewDeliverer(reviewId:number):Observable<ServiceResponse<BasicReviewDeliverer>>{
    return this.http.put<ServiceResponse<BasicReviewDeliverer>>("/api/review_deliverer/report/"+reviewId , {
      headers: this.headers,
      responseType: "json",
    });
  }

  
  deleteReviewProduct(reviewId:number):Observable<ServiceResponse<any>>{
    return this.http.delete<ServiceResponse<any>>("/api/review_product/"+reviewId);
  }

  deleteReviewDeliverer(reviewId:number):Observable<ServiceResponse<any>>{
    return this.http.delete<ServiceResponse<any>>("/api/review_deliverer/"+reviewId);
  }

  deleteReportReviewProduct(reviewId:number):Observable<ServiceResponse<BasicReviewProduct>>{
    return this.http.put<ServiceResponse<BasicReviewProduct>>("/api/review_product/unreport/"+reviewId  ,{
      headers: this.headers,
      responseType: "json",
    });
  }

  deleteReportReviewDeliverer(reviewId:number):Observable<ServiceResponse<BasicReviewDeliverer>>{
    return this.http.put<ServiceResponse<BasicReviewDeliverer>>("/api/review_deliverer/unreport/"+reviewId  ,{
      headers: this.headers,
      responseType: "json",
    });
  }


  findReviewsProductByProductId(productId:number):Observable<ServiceResponse<ReviewProduct[]>>{
    return this.http.get<ServiceResponse<ReviewProduct[]>>("/api/reviews_product/"+productId,  {
      headers: this.headers,
      responseType: "json",
    });
  }

  createReviewProduct(newReview:any):Observable<ServiceResponse<BasicReviewProduct>>{
    return this.http.post<ServiceResponse<BasicReviewProduct>>("/api/review_product",newReview,  {
      headers: this.headers,
      responseType: "json",
    });
  }

  createReviewDeliverer(newReview:any):Observable<ServiceResponse<BasicReviewProduct>>{
    return this.http.post<ServiceResponse<BasicReviewProduct>>("/api/review_deliverer",newReview,  {
      headers: this.headers,
      responseType: "json",
    });
  }

  changeReviewProduct(reviewId:number, newReview:any):Observable<ServiceResponse<BasicReviewProduct>>{
    return this.http.put<ServiceResponse<BasicReviewProduct>>("/api/review_product/"+reviewId,newReview,  {
      headers: this.headers,
      responseType: "json",
    });
  }

  changeReviewDeliverer(reviewId:number, newReview:any):Observable<ServiceResponse<BasicReviewDeliverer>>{
    return this.http.put<ServiceResponse<BasicReviewDeliverer>>("/api/review_deliverer/"+reviewId,newReview,  {
      headers: this.headers,
      responseType: "json",
    });
  }

  checkIfUserAlreadyCreateReviewProduct(userId:number, productId:number):Observable<ServiceResponse<ReviewProduct>>{
    return this.http.get<ServiceResponse<ReviewProduct>>("/api/review_product/find_by_user_and_product/"+userId+"/"+productId,  {
      headers: this.headers,
      responseType: "json",
    });
  }

  findProductReviewById(reviewId:number):Observable<ServiceResponse<BasicReviewProduct>>{
    return this.http.get<ServiceResponse<BasicReviewProduct>>("/api/review_product/"+reviewId,  {
      headers: this.headers,
      responseType: "json",
    });
  }

  findDelivererReviewById(reviewId:number):Observable<ServiceResponse<BasicReviewDeliverer>>{
    return this.http.get<ServiceResponse<BasicReviewDeliverer>>("/api/review_deliverer/"+reviewId,  {
      headers: this.headers,
      responseType: "json",
    });
  }

  findDelivererReviewByDelivererIdUserIdOrderId(delivererId:number,  productId:number):Observable<ServiceResponse<BasicReviewDeliverer>>{
    return this.http.get<ServiceResponse<BasicReviewDeliverer>>(`/api/review_deliverer/${delivererId}/${productId}`,  {
      headers: this.headers,
      responseType: "json",
    });

  }

  getDelivererReviewsReported():Observable<ServiceResponse<ReviewDeliverer[]>>{
    return this.http.get<ServiceResponse<ReviewDeliverer[]>>("/api/review_deliverer/reported",  {
      headers: this.headers,
      responseType: "json",
    });
  }

  getProductReviewsReported():Observable<ServiceResponse<ReviewProduct[]>>{
    return this.http.get<ServiceResponse<ReviewProduct[]>>("/api/review_product/reported",  {
      headers: this.headers,
      responseType: "json",
    });
  }

  getReviewsByDelivererId(delivererId:number):Observable<ServiceResponse<ReviewDeliverer[]>>{
    return this.http.get<ServiceResponse<ReviewDeliverer[]>>("/api/reviews_deliverer/"+delivererId,  {
      headers: this.headers,
      responseType: "json",
    });
  }
}
