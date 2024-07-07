import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../interfaces/iproduct';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  wishListItemsNum = new BehaviorSubject<number>(0);

  constructor(private _HttpClient: HttpClient) {
    this.loadWishlistCount();
  }
  private loadWishlistCount() {
    this.getAllWishList().subscribe({
      next: (res) => {
        console.log(res.count);
        this.wishListItemsNum.next(res.count);
      },
      error: (err) => {
        console.error('Error loading wishlist count:', err);
      },
    });
  }

  getAllProducts(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
  }
  getProductById(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  getAllCategories(): Observable<any> {
    return this._HttpClient.get(
      'https://ecommerce.routemisr.com/api/v1/categories'
    );
  }

  getProductByCategoryIn(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`
    );
  }

  // addToWishlist(product: IProduct): Observable<any> {
  //   return this._HttpClient.post(
  //     `https://ecommerce.routemisr.com/api/v1/wishlist`,
  //     { productId: product._id }
  //   );
  // }
  addToWishlist(product: IProduct): Observable<any> {
    return this._HttpClient
      .post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        productId: product._id,
      })
      .pipe(
        tap(() => {
          // Update the wishlist count when a product is added to the wishlist
          this.loadWishlistCount();
        })
      );
  }

  getAllWishList(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`
    );
  }


  // getAllWishList(): Observable<any> {
  //   return this._HttpClient.get(
  //     `https://ecommerce.routemisr.com/api/v1/wishlist`
  //   ).pipe(
  //     tap((res: any) => {
  //       const wishlistProductIds = res.data.map((item: any) => item._id);
  //       this.wishlistProducts = wishlistProductIds;
  //     })
  //   );
  // }

  // wishlistProducts: string[] = [];

}
