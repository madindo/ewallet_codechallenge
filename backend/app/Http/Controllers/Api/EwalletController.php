<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller as Controller;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;

class EwalletController extends BaseController
{
    public function deposit(Request $request) {
        $validated = $request->validate([
            'amount' => ['required', 'integer'],
        ]);

        $transaction = array_merge($validated, [
            'user_id' => auth()->user()->id,
            'to_user_id' => auth()->user()->id,
            'type' => 'deposit',
        ]);
        // save to transaction
        Transaction::create($transaction);

        $user = auth()->user();
        $user->update(['balance' => auth()->user()->balance + (int)$validated['amount']]);

        return response()->json([
                'success' => true,
                'message' => 'Successfully deposited'
            ]);
    }

    public function transfer(Request $request) {
        $validated = $request->validate([
            'user_id' => ['required'],
            'to_user_id' => ['required'],
            'amount' => ['required', 'integer'],
        ]);

        // check if user available
        $to = User::find($validated['to_user_id']);
        if (empty($to)) {
            return response()->json([
                'success' => false,
                'message' => 'Destination account is not available',
            ]);
        }

        // check the sender has balance?
        if (auth()->user()->balance < $validated['amount']) {
            return response()->json([
                'success' => false,
                'message' => 'You do not have the balance',
            ]);
        }

        $transaction = array_merge($validated,[
            'type' => 'transfer'
        ]);
        // save to transaction
        Transaction::create($transaction);

        // update balance current user
        auth()->user()->update(['balance' => auth()->user()->balance - (int)$validated['amount']]);

        //update to destination
        $destination_user = User::find($validated['to_user_id']);
        $destination_user->update(['balance' => $destination_user->balance + (int)$validated['amount']]);

        return response()->json([
                'success' => true,
                'message' => 'Successfully transfered'
            ]);

    }

    public function transactions() {
        $transactions = Transaction::where('user_id', auth()->user()->id)
            ->orWhere('to_user_id', auth()->user()->id)
            ->get();

        return response()->json($transactions);
    }
}