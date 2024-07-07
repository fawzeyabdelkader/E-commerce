import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product-service.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: IProduct[] = [];
  constructor(
    private _CartService: CartService,
    private _toaster: ToasterService,
    private _ProductService: ProductService
  ) {}
  ngOnInit(): void {
    // this.product.isInWishlist = this._ProductService.wishlistProducts.includes(this.product._id);

    this._ProductService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.error('Error loading products:', err);
      },
    });
  }

  // ngOnInit(): void {
  //   this._ProductService.getAllProducts().subscribe({
  //     next: (res) => {
  //       this.products = res.data.map((product: IProduct) => {
  //         return {
  //           ...product,
  //           isInWishlist: false
  //         };
  //       });
  //       this.checkWishlist();
  //     },
  //     error: (err) => {
  //       console.error('Error loading products:', err);
  //     },
  //   });
  // }

  isLoading: boolean = false;
  isAddedToWishlist: boolean = false;

  @Input() product!: IProduct;

  addToCart(id: string) {
    this.isLoading = true;
    this._CartService.addCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this._CartService.cartItemsNum.next(res.numOfCartItems);
        this._toaster.showSuccess();
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this._toaster.showError();
      },
    });
  }

  showSuccess() {
    this._toaster.showSuccess();
  }

  // checkWishlist() {
  //   this._ProductService.getAllWishList().subscribe({
  //     next: (res) => {
  //       const wishlistIds = res.data.map((item: any) => item.productId);
  //       this.products = this.products.map((product: IProduct) => {
  //         return {
  //           ...product,
  //           isInWishlist: wishlistIds.includes(product._id)
  //         };
  //       });
  //     },
  //     error: (err) => {
  //       console.error('Error loading wishlist:', err);
  //     },
  //   });
  // }

  addToWishlist(product: IProduct) {
    this._ProductService.addToWishlist(product).subscribe({
      next: (res) => {
        this.product.isInWishlist = true; // Update the local state to reflect the change

        console.log(res);
        this.isAddedToWishlist = true;
        // product.isInWishlist = true;
        // this._ProductService.wishListItemsNum.next(this._ProductService.wishListItemsNum.value + 1);
        this._ProductService.wishListItemsNum.next(res.count);
        this._toaster.showSuccess();
      },
      error: (err) => {
        console.error('Error adding product to wishlist:', err);
        this._toaster.showError();
        this.isAddedToWishlist = false;
      },
    });
  }
}
