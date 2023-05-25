<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AddToCart;
use Illuminate\Support\Facades\DB;

class AddToCartController extends Controller
{

    public function addToCart(Request $request){

// $addCart = AddToCart::where('item_id',$request->id);
// if($addCart){
//     $addCart->item_qty = $request->item_qty + 1;
//     return ["Cart Quantity Updated"];
// }else{


        $addCart = new AddToCart;
        $addCart->user_id = $request->user_id;
        $addCart->item_id = $request->id;
        $addCart->item_name = $request->item_name;
        $addCart->item_price = $request->item_price;
        $addCart->item_dsc = $request->item_dsc;
        $addCart->item_qty = $request->item_qty;
        $addCart->item_image = $request->item_image;
        $addCart->item_discount = $request->item_discount;
        $item_total = $request->item_price*$request->item_qty;
        $item_disc = (($item_total / 100 ) * $request->item_discount);
        $addCart->item_subtotal = $item_total - $item_disc;

       $addCart->save();
    //    - (($request->item_price / '100' ) * $request->item_discount)
    $cartItems = session('cartItems', []);
    $cartItems[] = $addCart;
    session(['cartItems' => $cartItems]);

    // Calculate and return grand total
    $grandTotal = 0;
    foreach ($cartItems as $cartItem) {
        $grandTotal += $cartItem->item_subtotal;
    }

    return ["Cart Data Added" , "data"=>$addCart, "grandTotal" => $grandTotal];

    }


    public function getcartData(){
        $addCart = AddToCart::get()->all();
        // $addCart = AddToCart::get()->where('user_id', $id);

        $grandTotal = 0;
        foreach ($addCart as $cartItem) {
            $grandTotal += $cartItem->item_subtotal;
        }

        // return $addCart;
    return ["Cart Data View" , "data"=>$addCart, "grandTotal" => $grandTotal];
    }



    public function getcartDataByUserId($id){
        $addCart = AddToCart::where('user_id', $id)->get();
        $grandTotal = 0;
        foreach ($addCart as $cartItem) {
            $grandTotal += $cartItem->item_subtotal;
        }
        return ["Cart Data View" , "data"=>$addCart, "grandTotal" => $grandTotal];
    }




    public function updateQuantityPlus(Request $request, $id){
    $updateQuantity = AddToCart::find($id);
    // if($updateQuantity){
        $updateQuantity->item_qty =  $updateQuantity->item_qty + 1;

        $item_total = $updateQuantity->item_price*$updateQuantity->item_qty;
        $item_disc = (($item_total / 100 ) * $updateQuantity->item_discount);
        $updateQuantity->item_subtotal = $item_total - $item_disc;
        $updateQuantity->save();

        return ["Message"=>"Cart Quantity Updated","Result"=>$updateQuantity];
    // }
    }

    public function updateQuantityMinus($id){
        $updateQuantity = AddToCart::find($id);
        // if($updateQuantity){
            $updateQuantity->item_qty =  $updateQuantity->item_qty - 1;
            $item_total = $updateQuantity->item_price*$updateQuantity->item_qty;
            $item_disc = (($item_total / 100 ) * $updateQuantity->item_discount);
            $updateQuantity->item_subtotal = $item_total - $item_disc;
            $updateQuantity->save();
            if($updateQuantity->item_qty === 0){
                $updateQuantity = AddToCart::find($id);
                $updateQuantity->delete();
            }
            return ["Message","Result"=>$updateQuantity];
        // }
        }

        public function truncateTable($id){
            $userIds = explode(',', $id);
            // DB::table('add_to_carts')->whereIn('user_id', $id)->delete();
            AddToCart::whereIn('user_id', $userIds)->delete();
            return ['Add To Carts Table has been truncate'];
        }

}
