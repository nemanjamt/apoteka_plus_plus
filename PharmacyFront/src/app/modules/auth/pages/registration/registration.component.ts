import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from 'src/app/modules/shared/validation/password-validation';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm!:FormGroup;
  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  createForm(){
    this.registrationForm = this.fb.group({
      firstName:["", [Validators.required, Validators.minLength(2)] ],
      lastName:["", [Validators.required,Validators.minLength(2)] ],
      username:["", [Validators.required, Validators.minLength(6)] ],
      email:["", [Validators.required, Validators.email] ],
      password:["", [Validators.required,Validators.minLength(10)] ],
      pwConfirm:["", [Validators.required]]
    },{
      validator: ConfirmedValidator("password", "pwConfirm"),
    })
  }
  
  ngOnInit(): void {
  }

}
