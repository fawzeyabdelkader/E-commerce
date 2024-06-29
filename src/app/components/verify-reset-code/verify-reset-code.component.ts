import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-reset-code',
  templateUrl: './verify-reset-code.component.html',
  styleUrls: ['./verify-reset-code.component.css']
})
export class VerifyResetCodeComponent {
  constructor(private _AuthService:AuthService,private _Router:Router){}
  errorMessage:string='';
  isLoading:boolean=false;
  verifyResetCodeForm:FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required])

  })



  handelVerifyResetCode(resetCode:FormGroup)
  {
    this.isLoading=true;

this._AuthService.verifyResetCode(resetCode.value).subscribe({
  // next:(response)=>{
  //   console.log(response);
  //   this.isLoading=false;
  //   if(response.message==='success'){
  //     this._Router.navigate(['/reset-password']);
  //   }
  //   else{
  //     this.errorMessage=response.message;
  //   }
  // },
  // error:(error)=>{
  //   console.log(error);
  //   this.isLoading=false;
  //   this.errorMessage=error.error.message;
  // }


  next:(res)=>{console.log(res)
    this._Router.navigate(['/reset-password'])
    this.isLoading=false;

  },
  error:(err)=>{console.log(err)
     this.errorMessage=err.error.message
     this.isLoading=false;
  }
})

  }






    // **  Test Verify Valid Or Invalid
    verifyValid: string = '';
    testVerifyCode(x: any) {
      if (x.verifyResetCodeForm.get('resetCode').status == 'INVALID') {
        this.verifyValid = 'la';
      } else if (x.verifyResetCodeForm.get('resetCode').status == 'VALID') {
        this.verifyValid = 'tmam';
      }
      console.log(this.verifyValid);
    }

}