import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserDataResponse } from '../../types/userData';

@Component({
  selector: 'app-pharmacists-list',
  templateUrl: './pharmacists-list.component.html',
  styleUrls: ['./pharmacists-list.component.scss']
})
export class PharmacistsListComponent implements OnInit {

  pharmacists!: UserDataResponse[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadPharmacists();
  }

  loadPharmacists(){
    this.userService.getPharmacists().subscribe({
      next: (res) => {this.pharmacists = res.data},
      error: (err) => {}
    })
  }

  handleNotification(){
    this.loadPharmacists();
  }

}
