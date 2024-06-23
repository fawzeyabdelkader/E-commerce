import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService,private _Router:Router) { }
  isLoading:boolean=false;
  errorMessage:string='';
  loginForm:FormGroup =new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern( /^[A-Z].{5,}$/)]),
  })
  handelLogin(loginForm:FormGroup){
    // console.log('handelLogin',this.loginForm.value);
    if (loginForm.valid) {
      this.isLoading = true;
      this._AuthService.login(loginForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.isLoading=false;
          if(response.message==='success'){
            localStorage.setItem('userToken',response.token);
            this._Router.navigate(['/home']);
            this._AuthService.isLogin.next(true);

          }else{
            this.errorMessage=response.message;
          }
        },
        error: (err) => {
          console.log(err);
          this.isLoading=false;
          this.errorMessage=err.error.message;
        }
      })
    }

  }

  // **  Test Email Valid Or Invalid

  emailValid: string = '';
  testEmail(x: any) {
    if (x.loginForm.get('email').status == 'INVALID') {
      this.emailValid = 'la';
    } else if (x.loginForm.get('email').status == 'VALID') {
      this.emailValid = 'tmam';
    }
    console.log(this.emailValid);
  }
  // **  Test Password Valid Or Invalid

  passwordValid: string = '';
  testPassword(x: any) {
    if (x.loginForm.get('password').status == 'INVALID') {
      this.passwordValid = 'la';
    } else if (x.loginForm.get('password').status == 'VALID') {
      this.passwordValid = 'tmam';
    }
    console.log(this.passwordValid);
  }

}
