<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Complaint;
use App\Models\GeoLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class LandingPageController extends Controller
{
    public function index()
    {
        $complaints = Complaint::get();
        return Inertia::render('LandingPage/LandingPage', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'complaints' => $complaints,
        ]);
    }

    public function peta()
    {
        $geoLocations = GeoLocation::all();
        return Inertia::render('LandingPage/Peta/Pages', compact('geoLocations'));
    }   
}
