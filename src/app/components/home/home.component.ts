import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/iproduct';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  allProducts:IProduct[]=[];
constructor(private _ProductServiceService:ProductServiceService){}
  ngOnInit(): void {
    this._ProductServiceService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res)
        this.allProducts=res.data
        console.log(res.data)
        console.log(res.data[1])
        console.log(res.data[1].brand)
        console.log(res.data[1].brand.name)
      },
      error:(err)=>{console.log(err);
      }
    })
   }


}
