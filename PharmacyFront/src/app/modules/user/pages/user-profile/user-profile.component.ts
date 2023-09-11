import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserService } from '../../services/user.service';
import { UserData } from '../../types/userData';
import { ChangeUserData } from '../../types/ChangeUserData';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  isMyProfile!:boolean;
  form: FormGroup;
  user !: UserData;
  successChanged !:boolean; 
  constructor(public authService: AuthService, private activatedRouter: ActivatedRoute,private router:Router,
     private fb: FormBuilder, private userService: UserService) { 
    this.form = this.fb.group({
      username: [null, Validators.required],
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.email]],
      lastName:[null, [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe(params => {
      let id = params['id'];
      if(id == null){
        this.isMyProfile = true;
        id = this.authService.getCurrentlyLoggedId();
      }else{
        this.isMyProfile = false;
        if(id != this.authService.getCurrentlyLoggedId() &&  (!this.authService.isAdmin() && !this.authService.isPharmacist())){
          this.router.navigate(['forbidden'])
        }
      }
      this.userService.findUserById(id).subscribe({
        next: (res) =>{
          this.user = {id:res.data.id,
          firstName:res.data.first_name,
          lastName: res.data.last_name,
          email:res.data.email,
          username:res.data.username
          };
          this.form.setValue({
            username:this.user.username,
            firstName:this.user.firstName,
            lastName:this.user.lastName,
            email:this.user.email
          });
        },
        error: (err) =>{}
      })
    });
  }

  saveChanges(){
    let data:ChangeUserData = {
      first_name : this.form.value.firstName,
      last_name:this.form.value.lastName,
      email:this.form.value.email
    };
    this.userService.changeUserData(this.user.id, data).subscribe({
      next: (res)=>{
        this.user = {id:res.data.id,
        firstName:res.data.first_name,
        lastName: res.data.last_name,
        email:res.data.email,
        username:res.data.username
        };
        this.form.setValue({
          username:this.user.username,
          firstName:this.user.firstName,
          lastName:this.user.lastName,
          email:this.user.email
        });
        this.successChanged = true;
        setTimeout(() => {
          this.successChanged = false;
        }, 1500);
      },
      error: (err)=>{

      }
    })
  }

  blockUser(){
    this.router.navigate(['user/block'], {queryParams:{"id":this.user.id}});
  }



}
