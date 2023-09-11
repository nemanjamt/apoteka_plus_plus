import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router){

  }
  jwt: JwtHelperService = new JwtHelperService();
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const item = localStorage.getItem("user") as string;
    const decodedItem = JSON.parse(item);

    if (item) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${decodedItem}` 
        }
      });
      if(this.jwt.isTokenExpired(item)){
        this.authService.logout();
        this.router.navigate(['/auth/signin']);
      }

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
