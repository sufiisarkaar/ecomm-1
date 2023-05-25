<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PendingCarts;

class PendingCartController extends Controller
{
    public function addPendingCarts(Request $request){

        $pendingCart = new PendingCarts;

        $pendingCart->item_id = $request->id;
        $pendingCart->item_name = $request->item_name;
        $pendingCart->item_price = $request->item_price;
        $pendingCart->item_dsc = $request->item_dsc;
        $pendingCart->item_qty = $request->item_qty;
        $pendingCart->item_image = $request->item_image;
        $pendingCart->item_discount = $request->item_discount;
        $item_total = $request->item_price*$request->item_qty;
        $item_disc = (($item_total / 100 ) * $request->item_discount);
        $pendingCart->item_subtotal = $item_total - $item_disc;
        $pendingCart->save();

        return ["success" => "Data Added To Pending Carts", "data"=> $pendingCart];

    }



    public function getLocalcartData(){
        $pendingCart = PendingCarts::get()->all();
        // $addCart = AddToCart::get()->where('user_id', $id);

        $grandTotal = 0;
        foreach ($pendingCart as $cartItem) {
            $grandTotal += $cartItem->item_subtotal;
        }

        // return $addCart;
    return ["Local Data View" , "data"=>$pendingCart, "grandTotal" => $grandTotal];
    }


    public function updateLocalQuantityPlus(Request $request, $id){
        $updateQuantity = PendingCarts::find($id);
        // if($updateQuantity){
            $updateQuantity->item_qty =  $updateQuantity->item_qty + 1;

            $item_total = $updateQuantity->item_price*$updateQuantity->item_qty;
            $item_disc = (($item_total / 100 ) * $updateQuantity->item_discount);
            $updateQuantity->item_subtotal = $item_total - $item_disc;
            $updateQuantity->save();

            return ["Message"=>"Cart Quantity Updated","Result"=>$updateQuantity];
        // }
        }

        public function updateLocalQuantityMinus($id){
            $updateQuantity = PendingCarts::find($id);
            // if($updateQuantity){
                $updateQuantity->item_qty =  $updateQuantity->item_qty - 1;
                $item_total = $updateQuantity->item_price*$updateQuantity->item_qty;
                $item_disc = (($item_total / 100 ) * $updateQuantity->item_discount);
                $updateQuantity->item_subtotal = $item_total - $item_disc;
                $updateQuantity->save();
                if($updateQuantity->item_qty === 0){
                    $updateQuantity = PendingCarts::find($id);
                    $updateQuantity->delete();
                }
                return ["Message","Result"=>$updateQuantity];
            // }
            }


            public function truncateTable($id){
                $ItemId = explode(',', $id);
                // DB::table('add_to_carts')->whereIn('user_id', $id)->delete();
                PendingCarts::whereIn('id', $ItemId)->delete();
                return ['Pending Carts Table has been truncate'];
            }



}
