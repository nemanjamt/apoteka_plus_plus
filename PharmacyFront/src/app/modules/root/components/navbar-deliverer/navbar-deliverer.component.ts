import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar-deliverer',
  templateUrl: './navbar-deliverer.component.html',
  styleUrls: ['./navbar-deliverer.component.scss']
})
export class NavbarDelivererComponent implements OnInit {

  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(["/auth/signin"]);
  }
  
  onOrders(){
    this.router.navigate(["orders"]);
  }

  onReviewsClick(){
    this.router.navigate(['/reviews/deliverer'],{queryParams:{id:this.authService.getCurrentlyLoggedId()}})
  }

}
