<?php

namespace App\Http\Controllers;

use App\Models\Food;

use Illuminate\Http\Request;

class FoodController extends Controller
{
    public function index()
    {
        $food_items = Food::all();

        return response()->json([
            'data' => $food_items,
            'status' => 1,
        ]);
    }
}
