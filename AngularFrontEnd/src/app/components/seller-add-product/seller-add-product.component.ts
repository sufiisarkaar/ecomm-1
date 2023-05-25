import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent {
  sellerAddProduct : FormGroup;

  constructor(private fb:FormBuilder, private sellerSer:SellerService, private router:Router){
    this.sellerAddProduct = this.fb.group({
      item_name : this.fb.control('',[Validators.required]),
      item_price : this.fb.control('',[Validators.required]),
      item_discount : this.fb.control('',[Validators.required]),
      item_qty : this.fb.control('',[Validators.required]),
      item_image : this.fb.control('',[Validators.required]),
      item_dsc : this.fb.control('',[Validators.required]),
    })
  }

  ngOnInit(): void {
    }


    addProduct(value:any){
if(this.sellerAddProduct.valid){
this.sellerSer.addProduct(value).subscribe((res:any)=>{
this.router.navigateByUrl('seller_dashboard');
})

}

    }
}
