import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/iproduct';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId?: string | null;
  productDetail?:IProduct;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductServiceService: ProductServiceService
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id');
    });
    if (this.productId != null) {
      this._ProductServiceService.getProductById(this.productId).subscribe({
        next: (response) => {
          console.log(response);
          this.productDetail = response.data;
          console.log(this.productDetail);

        },
        error: (error) => {
          console.log(error);
        },
      })
    }
  }
}
