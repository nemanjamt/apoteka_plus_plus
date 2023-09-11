import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar-pharmacist',
  templateUrl: './navbar-pharmacist.component.html',
  styleUrls: ['./navbar-pharmacist.component.scss']
})
export class NavbarPharmacistComponent implements OnInit {

  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(["auth/signin"]);
  }

  onCreateProduct(){
    this.router.navigate(["create-product"]);
  }

  onOrders(){
    this.router.navigate(["orders"]);
  }
}
