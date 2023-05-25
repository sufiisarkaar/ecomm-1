import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ItemServiceService } from './item-service.service';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private itemSer: ItemServiceService, private toaster:ToasterService, private router:Router) {

  }

  userSignup(data: any) {
    return this.http.post("http://localhost:8000/api/userSignup", data);
  }

  userLogin(data: any) {
    this.http.post("http://localhost:8000/api/userLogin", data, { observe: 'response' }).subscribe((result:any) => {
      if (!result.body.error) {
        localStorage.setItem('user', JSON.stringify(result.body));
        this.toaster.LoginSuccess(result.body.success);
        setTimeout(()=>{
          this.router.navigateByUrl("");
        },2000);
        this.cartToDb();
        this.myOrdersLocalToDB();
    this.itemSer.ActiveUser.emit(true);


      }else{
        this.toaster.LoginFail(result.body.error);
      }
    });
  }


  cartToDb() {
    let data = localStorage.getItem("MyItems");
    if (data) {
      let cartDataList = JSON.parse(data);
      let user: any = localStorage.getItem('user');
      let userId = user && JSON.parse(user).data.id;
      cartDataList.forEach((product: any) => {
        let cartData = {
          ...product,
          user_id: userId,
        }
        this.itemSer.addToCart(cartData).subscribe((res: any) => {
          localStorage.removeItem("MyItems");
          this.itemSer.PendingdataTruncateToDb();
        })
      });

    }


  }



  myOrdersLocalToDB(){
    let MyOrder = localStorage.getItem("myOrderLocal");
    let MyOrderData = MyOrder && JSON.parse(MyOrder);
    if(MyOrderData){
      let user: any = localStorage.getItem('user');
      let userId = user && JSON.parse(user).data.id;
      MyOrderData.forEach((data:any)=>{
        let finalMyOrders = {
          ...data,
          user_id : userId,
        }
        this.http.post("http://localhost:8000/api/postMyOrder",finalMyOrders).subscribe((res:any)=>{
          if(res.success){
            localStorage.removeItem("myOrderLocal");
            console.log("success local to db" , res);
          }

        })
      })
    }
  }


  updateProfile(UserId: any, NewData: any) {
    return this.http.put("http://localhost:8000/api/editProfile/" + UserId, NewData);
  }

  getProfile(UserId: any) {
    return this.http.get("http://localhost:8000/api/getProfile/" + UserId);
  }

placeOrder(data:any){
 return this.http.post("http://localhost:8000/api/postMyOrder",data);
}

getMyOrders(id:any){
  return this.http.get("http://localhost:8000/api/getMyOrder/"+id);
}

}
