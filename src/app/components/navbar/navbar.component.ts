import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUserLogin:boolean=false;
  userInfo:any={};
  constructor(private _AuthService:AuthService){}
  ngOnInit(): void {
    this._AuthService.isLogin.subscribe((isLogged)=>{this.isUserLogin=isLogged})
    // this._AuthService.isLogin.subscribe({
    //   next:( )=>{
    //      if(this._AuthService.isLogin.getValue() !=null){
    //       this.userInfo=this._AuthService.isLogin;
    //       console.log(this.userInfo.getValue().name);
    //     }
    //   }
    // })
   }
  handelLogout(){
    // localStorage.removeItem('userToken');
    this._AuthService.logOut()

  }

}
