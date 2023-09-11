import { Component, OnInit } from '@angular/core';
import { UserDataResponse } from '../../types/userData';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-deliverers-list',
  templateUrl: './deliverers-list.component.html',
  styleUrls: ['./deliverers-list.component.scss']
})
export class DeliverersListComponent implements OnInit {

  deliverers!: UserDataResponse[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadDeliverers();
  }

  loadDeliverers(){
    this.userService.getDeliverers().subscribe({
      next: (res) => {this.deliverers = res.data},
      error: (err) => {}
    })
  }

  handleNotification(){
    this.loadDeliverers();
  }

}
