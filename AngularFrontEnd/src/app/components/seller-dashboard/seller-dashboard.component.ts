import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent implements OnInit {
itemList:any;
updateProduct : FormGroup;
updatedID:any;

updateOBJ:any = {
  item_name: '',
  item_price: '',
  item_discount: '',
  item_dsc: '',
  item_qty: '',
  item_image: '',
}

constructor(private sellerSer:SellerService, private IS:ItemServiceService, private router:Router, private fb:FormBuilder, private dailog:MatDialog ){
  this.updateProduct = this.fb.group({
    item_name : this.fb.control('',[Validators.required]),
    item_price : this.fb.control('',[Validators.required]),
    item_discount : this.fb.control('',[Validators.required]),
    item_qty : this.fb.control('',[Validators.required]),
    item_image : this.fb.control('',[Validators.required]),
    item_dsc : this.fb.control('',[Validators.required]),
  })
}

ngOnInit(): void {
  this.checkSeller();
  this.getItems();
}

checkSeller(){
  let seller = localStorage.getItem("seller");
  let sellerVerify = seller && JSON.parse(seller).data.id
  if(sellerVerify){
 this.sellerSer.sellerActive.emit(true);
}
}



getItems() {
  this.IS.getItems().subscribe((res: any) => {
    this.itemList = res.Result;
  })
}

UpdatePro(item:any, UpdateProduct:any){
  this.updatedID = item.id;
  this.updateOBJ =  item;
this.dailog.open(UpdateProduct,{
  width:'550px'
})
console.log(this.updateOBJ,item,"itemmm");


}


ProductUpdate(value:any){
this.sellerSer.updateProduct(this.updatedID,value).subscribe((res:any)=>{
  console.log(res,"resss");
  this.getItems();
})
}


deleteProduct(){
this.sellerSer.deleteProduct(this.updatedID).subscribe((res)=>{
  console.log(res);
  this.getItems();
  
})

}
}
