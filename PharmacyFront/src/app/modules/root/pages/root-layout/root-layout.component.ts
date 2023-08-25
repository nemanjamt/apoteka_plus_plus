import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-root-layout',
  templateUrl: './root-layout.component.html',
  styleUrls: ['./root-layout.component.scss']
})
export class RootLayoutComponent implements OnInit {

  constructor() { 
    this.checkRole();
  }

  ngOnInit(): void {
  }
  role:string = '';
  checkRole() {
    const item = localStorage.getItem("user");

    if (item) {
      const jwt: JwtHelperService = new JwtHelperService();
      this.role = "ROLE_"+jwt.decodeToken(item).role;
      console.log(this.role);
    }else{
      this.role = '';
    }
  }

}
