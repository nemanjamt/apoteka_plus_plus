import { Component, OnInit } from '@angular/core';
import { UserData } from '../../types/userData';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-block-user',
  templateUrl: './block-user.component.html',
  styleUrls: ['./block-user.component.scss']
})
export class BlockUserComponent implements OnInit {

  userId!:number;
  form!:FormGroup;
  successBlock ?:boolean;
  constructor(private fb: FormBuilder, private activatedRouter:ActivatedRoute, private userService: UserService) {
    this.form = fb.group({
      reason:[null, [Validators.required,Validators.minLength(5)]]
    });
   }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe(params => {
      this.userId= params['id'];
    });
  }

  blockUser(){
    this.userService.blockUser(this.userId, {reason:this.form.value.reason}).subscribe({
      next: (res) =>{
        this.successBlock = true;
        setTimeout(() => {
          this.successBlock = undefined;
        }, 1500);
      },
      error: (err)=>{
        this.successBlock = false;
        setTimeout(() => {
          this.successBlock = undefined;
        }, 1500);
      }
    })
  }

}
