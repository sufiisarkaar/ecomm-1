import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {
  sellerLogin : FormGroup;

  constructor(private fb: FormBuilder, private item:ItemServiceService, private sellerSer:SellerService){
    this.sellerLogin = this.fb.group({
email: this.fb.control('',[]),
password : this.fb.control('',[]),
    });
  }


  ngOnInit(): void {
    this.emitUser();
    this.checkSeller();
  }


  loginSeller(value: any) {
    if (this.sellerLogin.valid) {
this.sellerSer.sellerLogin(value);

    }
  }

  // checkUser() {
  //   let user: any = localStorage.getItem("user");
  //   let UserId = user && JSON.parse(user).data.id;
  //   if (UserId) {
  //   this.item.ActiveUser.emit(true);
  //   }
  // }

  emitUser() {
    let user = localStorage.getItem("user");
    let userVerify = user && JSON.parse(user).data.id
    if(userVerify){
   this.item.ActiveUser.emit(true);
  }
  }



  checkSeller(){
    let seller = localStorage.getItem("seller");
    let sellerVerify = seller && JSON.parse(seller).data.id
    if(sellerVerify){
   this.sellerSer.sellerActive.emit(true);
  }
  }


}
