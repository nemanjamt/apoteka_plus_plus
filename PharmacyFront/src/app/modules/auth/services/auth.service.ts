import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Login } from '../../shared/types/login';
import { Token } from '../../shared/types/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http: HttpClient) { }

  login(auth: Login):Observable<HttpResponse<Token>>{

    return this.http.post<HttpResponse<Token>>("/api/auth/login", auth, {
      headers: this.headers,
      responseType: "json",
    });
  }

  logout() {
    sessionStorage.removeItem("productIds");
    localStorage.removeItem("user");
  }

  isLoggedIn():boolean {
    if(!localStorage.getItem("user")){
      return false;
    }

    return true;
  }

  getCurrentlyLoggedId():number{
    const item = localStorage.getItem("user");

    if (item) {
      const jwt: JwtHelperService = new JwtHelperService();
      let id = jwt.decodeToken(item).id;
      return id;
    }
    return -1;
  }
  
  

  // getCurrentLogged(){
  //   const jwt: JwtHelperService = new JwtHelperService();
  //   const token = localStorage.getItem("user");
  //   if(!token){
  //     return;
  //   }
  //   const info = jwt.decodeToken(token);
  //   let u:User = {id:info.id, username:info.username};
  //   console.log(u);
  //   return u;

  // }

  isCustomer():boolean{
    let token = localStorage.getItem("user");
    if(token){
      const jwt: JwtHelperService = new JwtHelperService();
      const info = jwt.decodeToken(token);
      return info.role === 'CUSTOMER';
    }
    return false;
  }

  isPharmacist():boolean{
    let token = localStorage.getItem("user");
    if(token){
      const jwt: JwtHelperService = new JwtHelperService();
      const info = jwt.decodeToken(token);
      return info.role === 'PHARMACIST';
    }
    return false;
  }

  isDeliverer():boolean{
    let token = localStorage.getItem("user");
    if(token){
      const jwt: JwtHelperService = new JwtHelperService();
      const info = jwt.decodeToken(token);
      return info.role === 'DELIVERER';
    }
    return false;
  }

  isAdmin():boolean{
    let token = localStorage.getItem("user");
    if(token){
      const jwt: JwtHelperService = new JwtHelperService();
      const info = jwt.decodeToken(token);
      return info.role === 'ADMIN';
    }
    return false;
  }

}
