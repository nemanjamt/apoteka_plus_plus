import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/modules/shared/types/login';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errMessage ?:string;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
   }

  ngOnInit(): void {
  }

  submit(){
    const auth: Login = {
      username: this.form.value.username,
      password: this.form.value.password,
    };
    this.authService.login(auth).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.errMessage = undefined;
          localStorage.setItem("user",JSON.stringify(res));
          this.router.navigate([""]);

        },

        error: (err) => { 
          this.errMessage = "wrong username/password";
        }
      }
    );
      
  }

}
