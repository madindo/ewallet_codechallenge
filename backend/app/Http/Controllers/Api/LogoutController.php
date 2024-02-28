<?php


namespace App\Http\Controllers\Api;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;
use Auth;
use Validator;
use App\Models\User;

class LogoutController extends BaseController
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        //remove token
        auth()->user()->tokens()->delete();
        $request->user()->currentAccessToken()->delete();

        //return response JSON
        return response()->json([
            'success' => true,
            'message' => 'Logout Berhasil!',
        ]);
    }
}