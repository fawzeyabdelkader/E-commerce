import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/iproduct';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  AllCategories:IProduct[]=[];
constructor(private _ProductService:ProductService){}
  ngOnInit(): void {
    this._ProductService.getAllCategories().subscribe({
      next: (response) => {
        console.log(response)
        this.AllCategories=response.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
