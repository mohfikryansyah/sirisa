<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ComplaintController;

Route::get('/', function () {
    return Inertia::render('LandingPage/LandingPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/complaint', [ComplaintController::class, 'store'])->name('complaint.store');
Route::delete('/complaint/delete-selected-rows', [ComplaintController::class, 'deleteSelectedRows'])->name('complaint.deleteSelectedRows');
Route::get('/result', [ComplaintController::class, 'search'])->name('complaint.search');

Route::middleware('auth')->group(function () {
    Route::resource('/complaint', ComplaintController::class)->except('store');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
