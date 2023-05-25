import { Component, OnInit } from '@angular/core';
import { ItemServiceService } from './services/item-service.service';
import { SellerService } from './services/seller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularFrontEnd';
constructor(private itemSer : ItemServiceService, private sellerSer:SellerService){}

ngOnInit(): void {
 this.emitUser();
 this.checkSeller();
}
emitUser() {
  let user = localStorage.getItem("user");
  let userVerify = user && JSON.parse(user).data.id
  if(userVerify){
 this.itemSer.ActiveUser.emit(true);
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
