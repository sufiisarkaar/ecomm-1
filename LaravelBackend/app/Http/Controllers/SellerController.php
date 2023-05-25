<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Seller;

class SellerController extends Controller
{
    public function sellerRegister(Request $request){
    $request->validate([
        'name' => 'required',
        'email' => 'required',
        'phone' => 'required',
        'password' => 'required',
    ]);

$user = new Seller;
$user->name = $request->name;
$user->email = $request->email;
$user->phone = $request->phone;
if($request->password === $request->confirmPassword){
$user->password = $request->password;
$user->save();

    return ["Success"=>"Registeration Success!, Please Wait You Will Redirect To Login Page..", $user];

}else{
return ["error"=>" Both Password Not Macth.."];
}


}

// where('password',$userpassword)->
// select('id','name','email','phone','password')->

public function sellerLogin(Request $req){

    $req->validate([
        'email' => 'required',
        'password' => 'required',
    ]);

    $user = Seller::where('email', $req->email)->first();

    if($user){
    $VERIFY = $req->password === $user->password;
     if($VERIFY){
         return ["success"=> "Login Success", "data"=>$user];
     }else {
         return ["error" =>"Password Wrong"];
     }

    }
    return ["error" => "Email Not Matched"];
    }


    public function editProfile($id, Request $request){
        $user = Seller::find($id);
        if($user){
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->password = $request->password;
        $user->save();
        return ["success"=>"User Info Has Been Updated", "data"=>$user];
        }else{
            return ["success"=>"User Not Found"];
        }
    }


    public function getProfile($id){
$user = Seller::find($id);
if($user){
return ["Profile Found","data"=>$user];
}
return ["Profile Not Found"];
}



}
