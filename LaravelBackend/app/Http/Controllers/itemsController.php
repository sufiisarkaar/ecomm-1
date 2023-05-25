<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Items;


class itemsController extends Controller
{
    public function postData(Request $request){
       $items = new Items;
       $items->item_name = $request->item_name;
       $items->item_price = $request->item_price;
       $items->item_discount = $request->item_discount;
       $items->item_image = $request->item_image;
       $items->item_dsc = $request->item_dsc;
       $items->item_qty = $request->item_qty;
        $items->save();

       return ["Results" => "Item Has Been Posted", $items];


    }

    public function getData(){

        $items = Items::all();
        return ["Result" => $items];

    }
}
