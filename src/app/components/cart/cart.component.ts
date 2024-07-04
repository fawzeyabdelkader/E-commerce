import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/interfaces/api-response';
import { CartService } from 'src/app/services/cart.service';
 import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartDetails?: ApiResponse;
  // cartDetails?:any;
  constructor(
    private _CartService: CartService,
    private _toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res;
        // this.cartDetails=res.data
        console.log(res);

      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeCartItem(id: string) {
    this._CartService.removeCartItem(id).subscribe({
      next: (res) => {
        this.cartDetails = res;
        // this.cartItemsNum.next(res.numOfCartItems) ;
        this._CartService.cartItemsNum.next(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateCartItem(id: string, count: number) {
    this._CartService.updateCartItem(id, count).subscribe({
      next: (res) => {
        this.cartDetails = res;
 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }



  showSuccess() {
    this._toaster.showSuccess()
  }

  showWarning() {
    this._toaster.showWarning()
  }

  showError() {
    this._toaster.showError()
  }


}
