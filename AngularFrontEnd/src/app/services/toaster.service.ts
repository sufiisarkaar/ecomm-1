import { Injectable } from '@angular/core';
import {  ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toaster:ToastrService) {

  }


  QuantityUpdatedPlus(name:any) {
    this.toaster.info('One More Quantity Addded ' +name, 'FoodCounter Says!');
  }

  QuantityUpdatedMinus(name:any) {
    this.toaster.warning('One Quantity Discrease ' +name, 'FoodCounter Says!');
  }

  LoginSuccess(message:any) {
    this.toaster.success('FoodCounter Says!...  Wait.. You will redirect to Dashboard',message);
  }

  LoginFail(message:any) {
    this.toaster.error(message, 'FoodCounter Says!');
  }

  LogOutSuccess() {
    this.toaster.info("Logged Out Successfully", 'FoodCounter Says!');
  }



 RegisterSuccess(message:any) {
    this.toaster.success(message, 'FoodCounter Says!');
  }

  RegisterFail(message:any) {
    this.toaster.error(message + 'Email Or Phone Already Exists', 'FoodCounter Says!');
  }

  AddToCartSuccess(item:any) {
    this.toaster.success(item + ' Added To Cart!', 'FoodCounter Says!');
  }

  AddToCartFail(item:any) {
    this.toaster.error(item + ' Already Exist In Cart', 'FoodCounter Says!');
  }

  RemoveCart(item:any) {
    this.toaster.error(item + ' Remove To Cart!', 'FoodCounter Says!');
  }


  ProfileUpdateSuccess() {
    this.toaster.info('Profile Updated', 'FoodCounter Says!');
  }

  ProfileUpdateFail() {
    this.toaster.error('Profile Not Updated', 'FoodCounter Says!');
  }

  OrderPlaced() {
    this.toaster.success('Order Placed Successfully', 'FoodCounter Says!');
  }

}
