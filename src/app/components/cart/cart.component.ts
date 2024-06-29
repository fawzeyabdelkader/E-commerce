import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/interfaces/api-response';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res;
        // this.cartDetails=res.data
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
    this.toastr.success('تمت الاضافه بنجاح', 'إضافه', {
      toastClass: `ngx-toastr ${this._CartService.getThemeClass()}`, // تطبيق الثيم
    });
  }

  showWarning() {
    this.toastr.warning('تم خفض الكميه ', 'تحذير', {
      toastClass: `ngx-toastr ${this._CartService.getThemeClass()}`, // تطبيق الثيم
    });
  }

  showError() {
    this.toastr.error('تم الحذف بنجاج', 'حذف', {
      toastClass: `ngx-toastr ${this._CartService.getThemeClass()}`, // تطبيق الثيم
    });
  }
}
