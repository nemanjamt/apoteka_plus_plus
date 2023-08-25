import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor(public router: Router){
    
  }
  canActivate():  boolean {
    // if(this.auth.isLoggedIn()){
    //   this.router.navigate(['']);
    //   return true;
    // }
    return true;
  }
  
}
