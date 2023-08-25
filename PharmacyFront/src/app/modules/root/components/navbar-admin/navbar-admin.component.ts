import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent implements OnInit {

  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    console.log("LOG OUTTT");
    this.authService.logout();
    this.router.navigate(["/auth/signin"]);
  }
  onOrders(){
    this.router.navigate(["orders"]);
  }
}
