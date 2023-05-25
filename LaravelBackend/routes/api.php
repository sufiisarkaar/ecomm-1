<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\itemsController;
use App\Http\Controllers\AddToCartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PendingCartController;
use App\Http\Controllers\MyOrdersController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\AddProductController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('/itemPost', [itemsController::class, 'postData']);
Route::get('/itemGet',[itemsController::class, 'getData']);


Route::post('/addCart', [AddToCartController::class, 'addToCart']);
// Route::get('/getCartData/{id}', [AddToCartController::class, 'getcartData']);
Route::get('/getCartData', [AddToCartController::class, 'getcartData']);
Route::get('/getCartData/{id}', [AddToCartController::class, 'getcartDataByUserId']);
Route::put('/updateQtyPlus/{id}', [AddToCartController::class, 'updateQuantityPlus']);
Route::put('/updateQtyMinus/{id}', [AddToCartController::class, 'updateQuantityMinus']);
Route::get('/addToCartsTruncate/{id}', [AddToCartController::class, 'truncateTable']);


Route::post('/userSignup', [UserController::class, 'userRegister']);
Route::post('/userLogin', [UserController::class, 'userLogin']);
Route::put('/editProfile/{id}', [UserController::class, 'editProfile']);
Route::get('/getProfile/{id}', [UserController::class, 'getProfile']);


Route::post('/sellerSignup', [SellerController::class, 'sellerRegister']);
Route::post('/sellerLogin', [SellerController::class, 'sellerLogin']);
Route::put('/editProfile/{id}', [SellerController::class, 'editProfile']);
Route::get('/getProfile/{id}', [SellerController::class, 'getProfile']);
Route::post('/addProduct', [SellerController::class, 'addProduct']);



Route::post('/addPending', [PendingCartController::class, 'addPendingCarts']);
Route::get('/truncateTable/{id}', [PendingCartController::class, 'truncateTable']);
Route::get('/getLocalData', [PendingCartController::class, 'getLocalcartData']);
Route::put('/updateQtyPlusLocal/{id}', [PendingCartController::class, 'updateLocalQuantityPlus']);
Route::put('/updateQtyMinusLocal/{id}', [PendingCartController::class, 'updateLocalQuantityMinus']);



Route::post('/postMyOrder', [MyOrdersController::class, 'postMyOrder']);
Route::get('/getMyOrder/{id}', [MyOrdersController::class, 'getMyOrder']);


Route::post('/addProduct', [AddProductController::class, 'addProduct']);
Route::put('/updateProduct/{id}', [AddProductController::class, 'updateProduct']);
Route::delete('/deleteProductByID/{id}', [AddProductController::class, 'deleteProductByID']);

// Route::get('/getCartData/{id}', [AddToCartController::class, 'getcartData']);
// Route::get('/getCartData/{id}', [AddProductController::class, 'getcartDataByUserId']);
// Route::put('/updateQtyPlus/{id}', [AddProductController::class, 'updateQuantityPlus']);
// Route::put('/updateQtyMinus/{id}', [AddProductController::class, 'updateQuantityMinus']);
// Route::get('/addToCartsTruncate/{id}', [AddProductController::class, 'truncateTable']);
