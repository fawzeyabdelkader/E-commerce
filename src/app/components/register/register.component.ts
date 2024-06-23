// ^ * * Template-driven forms * * ^//
// import { Component } from '@angular/core';
// import { NgForm, Validator } from '@angular/forms';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
// handelSubmit(myForm:NgForm){
//   console.log('handelSubmit',myForm);

// }
// }

// ^ * * Reactive forms * * ^ //

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatch } from 'src/app/custom-validations/match-password';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  errorMessage: string = '';
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z].{5,}$/),
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z].{5,}$/),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: passwordMatch }
  );

  handelRegister(regForm: FormGroup) {
    console.log(regForm);
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this._Router.navigate(['/login']);
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err.error.message);
          this.errorMessage = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
  // **  Test Name Valid Or Invalid
  nameValid: string = '';
  testName(x: any) {
    if (x.registerForm.get('name').status == 'INVALID') {
      this.nameValid = 'la';
    } else if (x.registerForm.get('name').status == 'VALID') {
      this.nameValid = 'tmam';
    }
    console.log(this.nameValid);
  }

  // **  Test Email Valid Or Invalid

  emailValid: string = '';
  testEmail(x: any) {
    if (x.registerForm.get('email').status == 'INVALID') {
      this.emailValid = 'la';
    } else if (x.registerForm.get('email').status == 'VALID') {
      this.emailValid = 'tmam';
    }
    console.log(this.emailValid);
  }
  // **  Test Password Valid Or Invalid

  passwordValid: string = '';
  testPassword(x: any) {
    if (x.registerForm.get('password').status == 'INVALID') {
      this.passwordValid = 'la';
    } else if (x.registerForm.get('password').status == 'VALID') {
      this.passwordValid = 'tmam';
    }
    console.log(this.passwordValid);
  }
  // **  Test rePassword Valid Or Invalid

  rePasswordValid: string = '';
  testRePassword(x: any) {
    if (x.registerForm.get('rePassword').status == 'INVALID') {
      this.rePasswordValid = 'la';
    } else if (x.registerForm.get('rePassword').status == 'VALID') {
      this.rePasswordValid = 'tmam';
    }
    console.log(this.rePasswordValid);
  }
  // **  Test phone Valid Or Invalid

  phoneValid: string = '';
  testPhone(x: any) {
    if (x.registerForm.get('phone').status == 'INVALID') {
      this.phoneValid = 'la';
    } else if (x.registerForm.get('phone').status == 'VALID') {
      this.phoneValid = 'tmam';
    }
    console.log(this.phoneValid);
  }
}
