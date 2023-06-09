<?php

use App\Http\Controllers\AdminForecastingController;
use App\Http\Controllers\AdminUsersController;
use App\Http\Controllers\IncomeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('/income', IncomeController::class)->middleware('auth');

Route::middleware('admin')->group(function () {
    Route::get('/forecasting', [AdminForecastingController::class, 'index'])->name('forecasting');
    Route::post('/forecasting', [AdminForecastingController::class, 'index'])->name('forecasting');
    Route::resource('/users', AdminUsersController::class);
});

require __DIR__ . '/auth.php';