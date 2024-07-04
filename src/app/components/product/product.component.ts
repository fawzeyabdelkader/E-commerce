import { Component, Input, OnInit,   } from '@angular/core';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent  {
   constructor(private _CartService:CartService,private _toaster:ToasterService){}

 @Input() product!:IProduct;

 addToCart(id:string)
 {
   this._CartService.addCartItem(id).subscribe({
     next:(res)=>{
       console.log(res)
       this._CartService.cartItemsNum.next(res.numOfCartItems)

     },
     error:(err)=>{
       console.log(err)
     }
   })
 }

 showSuccess() {
 this._toaster.showSuccess()

}

}
