import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../types/product';
import { ServiceResponse } from '../../shared/types/service-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http: HttpClient) { }

  search(params: HttpParams):Observable<HttpResponse<ServiceResponse<Product[]>>>{
    
    const options = {
      headers: this.headers,
      observe:"response",
      params:params,
      responseType:"json"
    };
    return this.http.get<ServiceResponse<Product[]>>("/api/product/search",  {
      headers: this.headers,
      observe:"response",
      params:params,
      responseType:"json"
    });
  }

  deleteProduct(productId:number):Observable<ServiceResponse<Product>>{
    return this.http.delete<ServiceResponse<Product>>("/api/product/"+productId);
  }
  createProduct(requestObject:any):Observable<ServiceResponse<Product>>{
    return this.http.post<ServiceResponse<Product>>("/api/product", requestObject);
  }
  changeProduct(id:number,requestObject:any):Observable<ServiceResponse<Product>>{
    return this.http.put<ServiceResponse<Product>>("/api/product/"+id, requestObject);
  }

  findProductById(productId: number|string):Observable<ServiceResponse<Product>>{

    return this.http.get<ServiceResponse<Product>>("/api/product/"+productId,  {
      headers: this.headers,
      responseType: "json",
    });
  }

  addInCart(productId : Number){
    
    if(!sessionStorage.getItem("productIds")){
      let productIds = [productId]
      sessionStorage.setItem("productIds", JSON.stringify(productIds));
    }else{
      let productIds = JSON.parse(sessionStorage.getItem("productIds") as string);
      productIds.push(productId)
      console.log(sessionStorage.getItem("productIds"));
      sessionStorage.setItem("productIds", JSON.stringify(productIds));
      console.log(sessionStorage.getItem("productIds"));
    }
  }
  addInCartWithQuantity(productId : number, quantity:number){
    
    if(!sessionStorage.getItem("productIds")){
      let productIds = [productId]
      sessionStorage.setItem("productIds", JSON.stringify(productIds));
    }else{
      let productIds = JSON.parse(sessionStorage.getItem("productIds") as string);
      for (let i = 0; i < quantity; i++) {
        productIds.push(Number(productId));
      }
      console.log(sessionStorage.getItem("productIds"));
      sessionStorage.setItem("productIds", JSON.stringify(productIds));
      console.log(sessionStorage.getItem("productIds"));
    }
  }
  removeFromCart(deletedProductId: Number){
    if(sessionStorage.getItem("productIds")){
  
      let productIds = JSON.parse(sessionStorage.getItem("productIds") as string);
      productIds = productIds.filter((productId: Number) => productId != deletedProductId)
      console.log(sessionStorage.getItem("productIds"));
      sessionStorage.setItem("productIds", JSON.stringify(productIds));
      console.log(sessionStorage.getItem("productIds"));
    }
  }

  setInCart(productId:number, value:number){
    let productIds = JSON.parse(sessionStorage.getItem("productIds") as string);
      productIds = productIds.filter((sessionProductId: Number) => sessionProductId != productId)
      for (let i = 0; i < value; i++) {
        productIds.push(productId);
      }
      console.log(sessionStorage.getItem("productIds"));
      sessionStorage.setItem("productIds", JSON.stringify(productIds));
      console.log(sessionStorage.getItem("productIds"));
  }
}
