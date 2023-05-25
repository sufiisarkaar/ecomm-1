import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { ContentComponent } from '../content/content.component';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent implements OnInit {
  cartList: any;
  quantity: any;
  grandTotal: any;

  constructor(
    private IS: ItemServiceService,
    private toaster: ToasterService,
    public dialog: MatDialog,
    private UserSer: UsersService
  ) {}

  ngOnInit() {
    this.cartData();
  }

  plusQuantity(cart: any, id: any, qty: any) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).data.id;
    if (userId) {
      if (qty < 9) {
        qty++;
        this.IS.updateCartQuantityPlus(id, qty).subscribe(
          (res: any) => {
            this.cartData();
            this.toaster.QuantityUpdatedPlus(cart.item_name);
          },
          (err) => {}
        );
      }
    } else {
      if (qty < 9) {
        qty++;
        this.IS.LocalupdateCartQuantityPlus(id, qty).subscribe(
          (res: any) => {
            this.cartData();
            this.toaster.QuantityUpdatedPlus(cart.item_name);
          },
          (err) => {}
        );
      }
    }
  }

  minusQuantity(item: any, id: any, qty: any) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).data.id;
    if (userId) {
      if (qty > 0) {
        qty--;
        this.IS.updateCartQuantityMinus(id, qty).subscribe(
          (res: any) => {
            this.cartData();
            if (qty > 0) {
              this.toaster.QuantityUpdatedMinus(item.item_name);
            }

            if (qty == 0) {
              this.toaster.RemoveCart(item.item_name);
              localStorage.removeItem('MyItems');
            }
          },
          (err) => {}
        );
      }
    } else {
      if (qty > 0) {
        qty--;
        this.IS.LocalupdateCartQuantityMinus(id, qty).subscribe(
          (res: any) => {
            this.cartData();
            if (qty > 0) {
              this.toaster.QuantityUpdatedMinus(item.item_name);
            }
            if (qty == 0) {
              this.toaster.RemoveCart(item.item_name);
              // Retrieve the data from local storage
              let data = JSON.parse(
                localStorage.getItem('MyItems') || '[]'
              ) as string[];

              // Filter out the data to remove based on the ID
              data = data.filter((item: any) => item.id !== id);

              // Store the updated array back to local storage
              localStorage.setItem('MyItems', JSON.stringify(data));
            }
          },
          (err) => {}
        );
      }
    }
  }

  cartCount: any;

  cartData() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).data.id;
    if(userId) {
      this.IS.getCartDataByUserID(userId).subscribe((res: any) => {
        this.cartList = res.data;
        console.log(this.cartList,"ddddddddd");

        this.cartCount = res.data.length;
        this.grandTotal = res.grandTotal;
      });
    } else {
      this.IS.getLocalData().subscribe((res: any) => {
        this.cartList = res.data;
        this.grandTotal = res.grandTotal;
        console.log('LOCAL', res);
      });
    }
  }

  placeOrder() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).data.id;
    if (userId) {
      this.cartList.forEach((item: any) => {
        this.UserSer.placeOrder(item).subscribe((res: any) => {
          this.IS.truncateAddToCartsTable(userId);
          this.cartData();
          localStorage.removeItem('ActiveAdded');
          this.toaster.OrderPlaced();
        });
      });
      // this.dialog.open(ContentComponent);
    } else {
      localStorage.setItem('myOrderLocal', JSON.stringify(this.cartList));
      this.cartList.forEach((items: any) => {
        this.IS.truncatePendingTable(items.id);
        console.log('LFFFFFFFFF', items.id);
        localStorage.removeItem('MyItems');
      });

      localStorage.removeItem('ActiveAdded');
      this.toaster.OrderPlaced();
      this.cartData();
    }
  }
}
