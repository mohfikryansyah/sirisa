<?php

use Inertia\Inertia;
use App\Models\GeoLocation;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\GeoLocationController;
use App\Http\Controllers\LandingPageController;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', [LandingPageController::class, 'index'])->name('landing-page');
Route::get('/peta-kawasan-rawan-bencana', [LandingPageController::class, 'peta'])->name('landing-page.peta.krb');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/complaint', [ComplaintController::class, 'store'])->name('complaint.store');
Route::delete('/complaint/delete-selected-rows', [ComplaintController::class, 'deleteSelectedRows'])->name('complaint.deleteSelectedRows');
Route::get('/result', [ComplaintController::class, 'search'])->name('complaint.search');



Route::middleware('auth')->group(function () {
    Route::resource('geo-location', GeoLocationController::class);
    Route::resource('/complaint', ComplaintController::class)->except('store');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
