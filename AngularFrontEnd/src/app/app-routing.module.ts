import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { ContentComponent } from './components/content/content.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { SellerComponent } from './components/seller/seller.component';
import { SellerDashboardComponent } from './components/seller-dashboard/seller-dashboard.component';
import { SellerRegisterComponent } from './components/seller-register/seller-register.component';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component';
import { SellerGuard } from './Auth/seller.guard';
import { UserGuard } from './Auth/user.guard';

const routes: Routes = [
  { path: "", component: ContentComponent },
  { path: "cart", component: AddToCartComponent },
  { path: "about", component: AboutComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: RegisterComponent },
  { path: "profile",  canActivate:[UserGuard], component: ProfileComponent },
  { path: "myOrder", component: MyOrdersComponent },
  { path: "seller", component: SellerComponent },
  { path: "seller_dashboard", canActivate:[SellerGuard], component: SellerDashboardComponent },
  { path: "seller_register", component: SellerRegisterComponent },
  { path: "addProduct", canActivate:[SellerGuard], component: SellerAddProductComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
