import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { Login } from '../../shared/types/login';
import { Token, Tokens } from '../../shared/types/token';
import { ServiceResponse } from '../../shared/types/service-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  jwt : JwtHelperService = new JwtHelperService();
  constructor(private http: HttpClient) { }

  login(auth: Login):Observable<ServiceResponse<Tokens>>{

    return this.http.post<ServiceResponse<Tokens>>("/api/auth/login", auth, {
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
  

  getToken(){
    // const token = localStorage.getItem("user");
    // if(this.jwt.isTokenExpired(token)){
    //   const new_access_token = this.refreshToken().subscribe(res);
    // }
    // return token;
  }

  refreshToken() {
    console.log("REFRESH!");
    const refreshToken = localStorage.getItem('refresh_token'); 
    if (refreshToken) {
      console.log("111");
      const refresh_headers = new HttpHeaders()
            .set('Authorization', 'Bearer ' + refreshToken)
            .set('Content-Type', 'application/json');
      return this.http.post<ServiceResponse<Token>>("/api/auth/refresh", {
        headers: refresh_headers,
        responseType: "json",
      });
      
    } else {
      console.log("123");
      return throwError('No refresh token found');
    }
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
