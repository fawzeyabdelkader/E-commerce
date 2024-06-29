import { Component, Input,   } from '@angular/core';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  constructor(private _CartService:CartService){}
 @Input() product!:IProduct;

 addToCart(id:string)
 {
   this._CartService.addCartItem(id).subscribe({
     next:(res)=>{
       console.log(res)
     },
     error:(err)=>{
       console.log(err)
     }
   })
 }

}
