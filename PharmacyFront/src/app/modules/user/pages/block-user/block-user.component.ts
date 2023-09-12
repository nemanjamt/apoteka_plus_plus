import { Component, OnInit } from '@angular/core';
import { UserData, UserDataResponse } from '../../types/userData';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { EmailService } from '../../services/email.service';
import { Email } from '../../types/email';
@Component({
  selector: 'app-block-user',
  templateUrl: './block-user.component.html',
  styleUrls: ['./block-user.component.scss']
})
export class BlockUserComponent implements OnInit {

  userId!:number;
  form!:FormGroup;
  successBlock ?:boolean;
  userData!: UserDataResponse;
  constructor(private fb: FormBuilder, private activatedRouter:ActivatedRoute, private userService: UserService, private emailService: EmailService) {
    this.form = fb.group({
      reason:[null, [Validators.required,Validators.minLength(5)]]
    });
   }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe(params => {
      this.userId= params['id'];
    });
    this.userService.findUserById(this.userId).subscribe({
      next: (res) => {this.userData = res.data;},
      error: (err) =>{}
    })
  }

  blockUser(){
    this.userService.blockUser(this.userId, {reason:this.form.value.reason}).subscribe({
      next: (res) =>{
        let emailObject: Email = {subject:"BLOKIRANJE NA APLIKACIJI APOTEKA PLUS PLUS",recipient: this.userData.email, message:this.form.value.reason};
        this.emailService.sendEmail(emailObject).subscribe({
          next: (res) => {},
          error: (err) => {}
        })
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
