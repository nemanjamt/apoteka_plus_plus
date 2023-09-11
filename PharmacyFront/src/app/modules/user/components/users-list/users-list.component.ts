import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserDataResponse } from '../../types/userData';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Input()
  users!: UserDataResponse[];
  modalRef!: NgbModalRef;
  choosedUserId!: number;
  @Output()
  notify: EventEmitter<any> = new EventEmitter();
  constructor(private modalService: NgbModal, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  openModal(target:any, userId:number){
    this.modalRef = this.modalService.open(target, {
      centered: true,
      backdrop: 'static',
    });
    this.choosedUserId = userId;
  }

  deleteUser(){
    this.userService.deleteUser(this.choosedUserId).subscribe({
      next: (res) => {this.notify.emit(); this.modalRef.close();},
      error: (err) =>{this.modalRef.close();}
    });
  }

  viewProfile(userId:number){
    this.router.navigate(['/user/profile'], {queryParams:{id:userId}});
  }
}
