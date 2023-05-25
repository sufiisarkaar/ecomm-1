import { Component, OnInit } from '@angular/core';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { SellerService } from 'src/app/services/seller.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  itemList: any;
  IsLogin: any;
  ActiveId : any;
  ActiveIdMulti:any;
  constructor(private IS: ItemServiceService, private userS: UsersService, private toaster:ToasterService, private sellerSer:SellerService) { }

  ngOnInit() {
this.checkActiveAdded();
    this.getItems();
    this.emitUser();
    this.checkSeller();
  }

  getItems() {
    this.IS.getItems().subscribe((res: any) => {
      this.itemList = res.Result;
    })
  }


  AddToCart(item: any) {
    // Call API to add item to cart if user is logged in
    let user = localStorage.getItem("user")
    let user_id = user && JSON.parse(user).data.id;
    let addData = {
      ...item,
      user_id
    }
if(this.ActiveIdMulti?.includes(item.id)){
  this.toaster.AddToCartFail(item.item_name);
}else{

    if(user){


      this.IS.addToCart(addData).subscribe((response:any) => {
        this.ActiveId = response.data.item_id;
        this.cartData();
        this.toaster.AddToCartSuccess(item.item_name);

      },(err)=>{
        this.toaster.AddToCartFail(item.item_name);
      });
    }
    if (!localStorage.getItem("user")) {
      // Retrieve existing data from LocalStorage or create a new empty array
      let existingData: any = JSON.parse(localStorage.getItem("MyItems") || "[]") as string[];

      // Add the new object to the existing array
      existingData.push(item);

      // Save the updated array to LocalStorage
      localStorage.setItem("MyItems", JSON.stringify(existingData));
      this.IS.cardData.emit(existingData)
      this.toaster.AddToCartSuccess(item.item_name);

      this.IS.PendingdataAddedLocalToDb(item).subscribe((res: any) => {
console.log("resssssss",res);


      })
    }
  }

     // Retrieve the data from local storage
     let data:any = JSON.parse(localStorage.getItem('ActiveAdded') || "[]");
data.push(item.id);
// Store the updated array back to local storage
localStorage.setItem('ActiveAdded', JSON.stringify(data));
this.ActiveIdMulti = data ;
  }




  cartData() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).data.id;
    this.IS.getCartDataByUserID(userId).subscribe((res: any) => {
      this.IS.cardData.emit(res.data);
    })
  }


  emitUser() {
    let user = localStorage.getItem("user");
    let userVerify = user && JSON.parse(user).data.id
    if(userVerify){
   this.IS.ActiveUser.emit(true);
  }
  }


checkActiveAdded(){
  let data:any = JSON.parse(localStorage.getItem('ActiveAdded') || "[]");

  // Store the updated array back to local storage
  localStorage.setItem('ActiveAdded', JSON.stringify(data));
  this.ActiveIdMulti = data ;
}


checkSeller(){
  let seller = localStorage.getItem("seller");
  let sellerVerify = seller && JSON.parse(seller).data.id
  if(sellerVerify){
 this.sellerSer.sellerActive.emit(true);
}
}




}
