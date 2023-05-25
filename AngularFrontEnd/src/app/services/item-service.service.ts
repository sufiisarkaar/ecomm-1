import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService implements OnInit {
  cardData = new EventEmitter<any[] | []>();
  ActiveUser = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
    this.checkLocalStorage();
  }

  ngOnInit() {
    this.checkLocalStorage();
  }

  getItems() {
    return this.http.get("http://localhost:8000/api/itemGet");
  }

  addToCart(data: any) {
    return this.http.post("http://localhost:8000/api/addCart", data);
  }

  getCartData() {
    return this.http.get("http://localhost:8000/api/getCartData");
  }


  getCartDataByUserID(userId: any) {
    return this.http.get("http://localhost:8000/api/getCartData/"+userId);
  }

  updateCartQuantityPlus(id: any, qty: any) {
    return this.http.put("http://localhost:8000/api/updateQtyPlus/" + id, qty);
  }

  updateCartQuantityMinus(id: any, qty: any) {
    return this.http.put("http://localhost:8000/api/updateQtyMinus/" + id, qty);
  }


  PendingdataAddedLocalToDb(data: any) {
    return this.http.post("http://localhost:8000/api/addPending", data);
  }

  PendingdataTruncateToDb() {
    this.http.get("http://localhost:8000/api/truncateTable").subscribe((res) => {
    })
  }



  getLocalData() {
    return this.http.get("http://localhost:8000/api/getLocalData");
  }




  LocalupdateCartQuantityPlus(id: any, qty: any) {
    return this.http.put("http://localhost:8000/api/updateQtyPlusLocal/" + id, qty);
  }

  LocalupdateCartQuantityMinus(id: any, qty: any) {
    return this.http.put("http://localhost:8000/api/updateQtyMinusLocal/" + id, qty);
  }



  checkLocalStorage() {
    let cardData: any = localStorage.getItem("MyItems");
    let confirmCardData = cardData && JSON.parse(cardData).length;
    if (confirmCardData === null) {
      this.PendingdataTruncateToDb();
    }
  }

  truncateAddToCartsTable(id:any[]){
    return this.http.get("http://localhost:8000/api/addToCartsTruncate/"+id).subscribe((res:any)=>{
      console.log("Empty Carts",res);

    })
  }


  truncatePendingTable(id:any[]){
    return this.http.get("http://localhost:8000/api/truncateTable/"+id).subscribe((res:any)=>{
      console.log("Empty  Pending Carts",res);

    })
  }

}
