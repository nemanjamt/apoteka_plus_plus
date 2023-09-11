import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(public router: Router, private authService: AuthService){
    
  }
  canActivate():  boolean {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
  
}
