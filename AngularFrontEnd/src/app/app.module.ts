import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { SellerComponent } from './components/seller/seller.component';
import { SellerDashboardComponent } from './components/seller-dashboard/seller-dashboard.component';
import { SellerRegisterComponent } from './components/seller-register/seller-register.component';
import { SellerAddProductComponent } from './components/seller-add-product/seller-add-product.component'
import { SellerGuard } from './Auth/seller.guard';
import { UserGuard } from './Auth/user.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    AddToCartComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AboutComponent,
    MyOrdersComponent,
    SellerComponent,
    SellerDashboardComponent,
    SellerRegisterComponent,
    SellerAddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [SellerGuard,UserGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
