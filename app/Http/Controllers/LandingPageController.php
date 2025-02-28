<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class LandingPageController extends Controller
{
    public function index()
    {
        return Inertia::render('LandingPage/LandingPage', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function peta()
    {
        return Inertia::render('LandingPage/Peta/PetaBencana');
    }   
}
