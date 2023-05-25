<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Items;

class AddProductController extends Controller
{

    public function addProduct(Request $request)
    {

        $addProduct = new Items;
        $addProduct->item_name = $request->item_name;
        $addProduct->item_price = $request->item_price;
        $addProduct->item_dsc = $request->item_dsc;
        $addProduct->item_qty = $request->item_qty;
        $addProduct->item_image = $request->item_image;
        $addProduct->item_discount = $request->item_discount;
        // $item_total = $request->item_price * $request->item_qty;
        // $item_disc = (($item_total / 100) * $request->item_discount);
        // $addProduct->item_subtotal = $item_total - $item_disc;

        $addProduct->save();


        return ["Product Added", "data" => $addProduct];
    }


public function updateProduct($id,Request $request){
$updateProduct = Items::find($id);
$updateProduct->item_name = $request->item_name;
$updateProduct->item_price = $request->item_price;
$updateProduct->item_dsc = $request->item_dsc;
$updateProduct->item_discount = $request->item_discount;
$updateProduct->item_qty = 1;
$updateProduct->item_image = $request->item_image;
$updateProduct->save();
return ["message"=>"Updated", $updateProduct];
}



public function deleteProductByID($id){
    $deleteProduct = Items::find($id);
    $deleteProduct->delete();
    return ["message"=>"Product Deleted"];
}


    public function truncateTable($id)
    {
        $userIds = explode(',', $id);
        // DB::table('add_to_carts')->whereIn('user_id', $id)->delete();
        Items::whereIn('user_id', $userIds)->delete();
        return ['Add To Carts Table has been truncate'];
    }
}
