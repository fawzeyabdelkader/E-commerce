import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUserLogin:boolean=false;
  userInfo:any={};
  numOfCartItems:number=0
  constructor(private _AuthService:AuthService,private _CartService:CartService){}
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
   this._CartService.cartItemsNum.subscribe({
    next:(numS)=>{this.numOfCartItems=numS}
   })
   }
  handelLogout(){
    // localStorage.removeItem('userToken');
    this._AuthService.logOut()

  }

}
