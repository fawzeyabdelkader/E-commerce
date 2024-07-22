import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyResetCodeComponent } from './components/verify-reset-code/verify-reset-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { authGuard } from './Guards/auth.guard';
import { noAuthGuard } from './Guards/no-auth.guard';
 import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AllWishListComponent } from './components/all-wish-list/all-wish-list.component';
import { CategoryProductComponent } from './components/category-product/category-product.component';

const routes: Routes = [
  {path:'',redirectTo:'register',pathMatch:'full'},

   {path:'home',canActivate:[authGuard],component:HomeComponent},
   {path:'cart',canActivate:[authGuard],component:CartComponent},
  {path:'products',canActivate:[authGuard],component:ProductsComponent},
  {path:'categories',canActivate:[authGuard],component:CategoriesComponent},
   {path:'brands',canActivate:[authGuard],component:BrandsComponent},
  {path:'product/:id',canActivate:[authGuard],component:ProductDetailsComponent},
  {path:'shippingAddress/:id',canActivate:[authGuard],component:ShippingAddressComponent},
  {path:'allorders',canActivate:[authGuard],component:OrdersComponent},
  {path:'allWishList',canActivate:[authGuard],component:AllWishListComponent},
  {path:'products/category/:id',canActivate:[authGuard],component:CategoryProductComponent},

  {path:'login',canActivate:[noAuthGuard],component:LoginComponent},
  {path:'register',canActivate:[noAuthGuard],component:RegisterComponent},
  {path:'forget-password',canActivate:[noAuthGuard],component:ForgetPasswordComponent},
  {path:'verify-reset-code',canActivate:[noAuthGuard],component:VerifyResetCodeComponent},
  {path:'reset-password',canActivate:[noAuthGuard],component:ResetPasswordComponent},

  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
