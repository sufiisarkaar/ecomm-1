import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ToasterService } from './toaster.service';
import { Route, Router } from '@angular/router';
import { ItemServiceService } from './item-service.service';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
sellerActive = new EventEmitter<boolean>();
  localURL:any = "http://localhost:8000/api";
  constructor(private http: HttpClient, private toaster:ToasterService, private router:Router, private itemSer:ItemServiceService) { }

  sellerSignup(data:any){
return this.http.post(`${this.localURL}/sellerSignup`,data)
  }



  sellerLogin(data: any) {
    this.http.post(`${this.localURL}/sellerLogin`, data, { observe: 'response' }).subscribe((result:any) => {
      if (!result.body.error) {
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.toaster.LoginSuccess(result.body.success);
        setTimeout(()=>{
          this.router.navigateByUrl("seller_dashboard");
        },2000);

    this.itemSer.ActiveUser.emit(true);


      }else{
        this.toaster.LoginFail(result.body.error);
      }
    });
  }


  addProduct(data:any){
return this.http.post(`${this.localURL}/addProduct`,data);
  }



  updateProduct(id:any, data:any){
    return this.http.put(`${this.localURL}/updateProduct/`+id, data )
  }

  deleteProduct(id:any){
return this.http.delete(`${this.localURL}/deleteProductByID/`+id)
  }


}
