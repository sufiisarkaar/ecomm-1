import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { SellerService } from 'src/app/services/seller.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userS: UsersService, private item:ItemServiceService, private sellerSer:SellerService) {
    this.loginForm = this.fb.group({
      'email': this.fb.control('', [Validators.required, Validators.email]),
      'password': this.fb.control('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.emitUser();
    this.checkSeller();
  }


  loggedIn(value: any) {
    if (this.loginForm.valid) {
      this.userS.userLogin(value);
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
