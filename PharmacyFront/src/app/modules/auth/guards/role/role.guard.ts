import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string = route.data['expectedRoles'];
    const token = localStorage.getItem("user");
    const jwt: JwtHelperService = new JwtHelperService();
    console.log(token);
    console.log(!token);
    console.log("123321");
    
    if (!token) {
      this.router.navigate([""]);
      return false;
    }
    console.log("USLO");
    

    const info = jwt.decodeToken(token);
    console.log(info.role);
    const roles: string[] = expectedRoles.split("|");
    console.log("????");
    console.log(roles);
    console.log(info.role);
    if (roles.indexOf(info.role) === -1) {
      this.router.navigate(["/forbidden"]);
      return false;
    }
    return true;
    console.log("123");
    return true;
  }
  
}
