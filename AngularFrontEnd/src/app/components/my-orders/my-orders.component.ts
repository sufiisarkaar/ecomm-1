import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
myOrderList:any;

constructor(private userSer:UsersService){

}

ngOnInit(): void {
  this.myOrder();
}

myOrder(){
  let user:any = localStorage.getItem("user");
  let userId = user && JSON.parse(user).data.id;
  if(userId){

      this.userSer.getMyOrders(userId).subscribe((res:any)=>{
        this.myOrderList = res.data
        console.log(  this.myOrderList ,"resss");
    })

  }else{
    let localMyOrders = localStorage.getItem("myOrderLocal");
    let myOrder = localMyOrders && JSON.parse(localMyOrders);
    this.myOrderList = myOrder;
  }
}


cancelOrder(id:any){
  console.log(id,"iddddd");

}


}
