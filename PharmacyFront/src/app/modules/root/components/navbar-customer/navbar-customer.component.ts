import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar-customer',
  templateUrl: './navbar-customer.component.html',
  styleUrls: ['./navbar-customer.component.scss']
})
export class NavbarCustomerComponent implements OnInit {

  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(["auth/signin"]);
  }
  clickCart(){
    this.router.navigate(["cart"]);
  }
  onOrders(){
    this.router.navigate(["orders"]);
  }
}
