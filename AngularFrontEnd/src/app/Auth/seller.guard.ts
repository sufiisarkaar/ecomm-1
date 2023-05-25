import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerGuard implements CanActivate {
  constructor(private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let seller = localStorage.getItem("seller");
      let sellerID = seller && JSON.parse(seller).data.id;
      if(sellerID){
        
        return true;

      }

      this.router.navigateByUrl("seller")
      return false;
  }

}
