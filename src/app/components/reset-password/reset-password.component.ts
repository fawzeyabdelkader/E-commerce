import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  constructor(private _AuthService:AuthService,private _Router:Router) { }
  errorMessage:string='';
isLoading:boolean=false;

resetPassword:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email]),
  newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z].{5,}$/)])
})




handelResetPassword(form:FormGroup)
{
  this.isLoading=true;
  this._AuthService.resetPassword(form.value).subscribe({
    next:(res)=>{console.log(res)
      this._Router.navigate(['/login'])
      this.isLoading=false;

    },
    error:(err)=>{console.log(err)
      this.errorMessage=err.error.message;
      this.isLoading=false;

    }
  })
}











  // **  Test Email Valid Or Invalid
  emailValid: string = '';
  testEmail(x: any) {
    if (x.resetPassword.get('email').status == 'INVALID') {
      this.emailValid = 'la';
    } else if (x.resetPassword.get('email').status == 'VALID') {
      this.emailValid = 'tmam';
    }
    console.log(this.emailValid);
  }
  // **  Test Password Valid Or Invalid

  passwordValid: string = '';
  testResetPassword(x: any) {
    if (x.resetPassword.get('newPassword').status == 'INVALID') {
      this.passwordValid = 'la';
    } else if (x.resetPassword.get('newPassword').status == 'VALID') {
      this.passwordValid = 'tmam';
    }
    console.log(this.passwordValid);
  }
}
