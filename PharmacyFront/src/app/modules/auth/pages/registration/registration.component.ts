import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from 'src/app/modules/shared/validation/password-validation';
import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm!:FormGroup;
  errorMessage !: string;
  success !: boolean;
  constructor(private fb: FormBuilder, public authService: AuthService, private userService: UserService) { 
    this.createForm();
  }

  createForm(){
    this.registrationForm = this.fb.group({
      firstName:["", [Validators.required, Validators.minLength(2)] ],
      lastName:["", [Validators.required,Validators.minLength(2)] ],
      username:["", [Validators.required, Validators.minLength(6)] ],
      email:["", [Validators.required, Validators.email] ],
      role:["", this.authService.isAdmin() ? [Validators.required] : []],
      password:["", [Validators.required,Validators.minLength(10)] ],
      pwConfirm:["", [Validators.required]]
    },{
      validator: ConfirmedValidator("password", "pwConfirm"),
    })
  }
  
  ngOnInit(): void {
  }

  createUser(){
    let requestObject = {
      first_name:this.registrationForm.value.firstName,
      last_name: this.registrationForm.value.lastName,
      username: this.registrationForm.value.username,
      email: this.registrationForm.value.email,
      role:this.registrationForm.value.role === "" ? "CUSTOMER":this.registrationForm.value.role,
      password: this.registrationForm.value.password
    };
    console.log(requestObject);
    this.userService.createUser(requestObject).subscribe({
      next: (res) => {
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 2000);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message;
        setTimeout(() => {
          this.errorMessage = "";
        }, 2000);
      }
    });

  }

  

}
