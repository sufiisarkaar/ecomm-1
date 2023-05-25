import { Component, HostListener, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { SellerService } from 'src/app/services/seller.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  sellerActive:any;
 ActiveUser:any;
  cartCount: number = 0;
  bgColor = 'transparent'; // Initial background color

  path:any;

  constructor(private itemSer: ItemServiceService, private route:Router, private toaster:ToasterService, private sellerSer:SellerService) { }

  ngOnInit() {
    this.cartItemsCount();
    this.checkUser();
    this.emitUser();
    this.checkSeller();
    this.checkSellerActive();
    this.dynimicallyNavigate();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (window.pageYOffset > 50) {
      this.bgColor = '#ffff'; // Change background color after scrolling 50px
    } else {
      this.bgColor = 'transparent'; // Change background color back to transparent
    }
  }


  cartItemsCount() {
    let cartData = localStorage.getItem("MyItems");
    if (cartData) {
      this.cartCount = JSON.parse(cartData).length;
    }
    this.itemSer.cardData.subscribe((item) => {
      this.cartCount = item.length;
    })
  }


  checkUser() {

   this.itemSer.ActiveUser.subscribe((res)=>{
     this.ActiveUser = res;
    })

  }



  checkSellerActive(){
this.sellerSer.sellerActive.subscribe((res:any)=>{
  this.sellerActive = res;
})
  }


  emitUser() {
    let user = localStorage.getItem("user");
    let userVerify = user && JSON.parse(user).data.id
    if(userVerify){
   this.itemSer.ActiveUser.emit(true);
  }
  }


  logOut(){
    localStorage.removeItem("user");
    localStorage.removeItem("seller");
    this.sellerSer.sellerActive.emit(false);
    this.itemSer.ActiveUser.emit(false);
    this.toaster.LogOutSuccess();
    this.route.navigate(['/login'])
  }

  checkSeller(){
    let seller = localStorage.getItem("seller");
    let sellerVerify = seller && JSON.parse(seller).data.id
    if(sellerVerify){
   this.sellerSer.sellerActive.emit(true);
  }
  }


  dynimicallyNavigate(){
    let user = localStorage.getItem("user");
    let userID = user && JSON.parse(user).data.id;

    let seller = localStorage.getItem("seller");
    let sellerID = seller && JSON.parse(seller).data.id;

    if(userID){
      this.path = "";
    }
     if(sellerID){
      this.path = "seller_dashboard";
    }
    if(!userID && !sellerID){
      this.path = "";
    }
  }


}
