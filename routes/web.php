<?php

use App\Http\Controllers\Admin\ClinicalCaseController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\PersonalInfoController;
use App\Http\Controllers\Admin\RotationController;
use App\Http\Controllers\Admin\SectionVisibilityController;
use App\Http\Controllers\Admin\SkillsController;
use App\Http\Controllers\Admin\SkripsiController;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\GuestbookController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PortfolioController::class, 'index'])->name('home');

Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AdminAuthController::class, 'login'])->name('login.submit');
Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');

Route::post('/guestbook', [GuestbookController::class, 'store'])->name('guestbook.store');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::prefix('admin')->name('admin.')->middleware('admin')->group(function () {
    Route::redirect('/', '/admin/personal-info');

    Route::get('personal-info', [PersonalInfoController::class, 'edit'])->name('personal-info.edit');
    Route::put('personal-info', [PersonalInfoController::class, 'update'])->name('personal-info.update');

    Route::get('skripsi', [SkripsiController::class, 'edit'])->name('skripsi.edit');
    Route::put('skripsi', [SkripsiController::class, 'update'])->name('skripsi.update');

    Route::get('skills', [SkillsController::class, 'edit'])->name('skills.edit');
    Route::put('skills', [SkillsController::class, 'update'])->name('skills.update');

    Route::get('settings', [SectionVisibilityController::class, 'edit'])->name('settings.edit');
    Route::put('settings', [SectionVisibilityController::class, 'update'])->name('settings.update');

    Route::resource('clinical-cases', ClinicalCaseController::class)->except(['show']);
    Route::resource('rotations', RotationController::class)->except(['show']);
    // "media" singularizes to "medium" by default English inflection — pin the route
    // parameter name explicitly so controller methods can type-hint `MediaInfographic $media`.
    Route::resource('media', MediaController::class)->except(['show'])->parameters(['media' => 'media']);

    Route::get('guestbook', [GuestbookController::class, 'index'])->name('guestbook.index');
    Route::delete('guestbook/{guestbookEntry}', [GuestbookController::class, 'destroy'])->name('guestbook.destroy');

    Route::get('contact', [ContactController::class, 'index'])->name('contact.index');
    Route::delete('contact/{contactMessage}', [ContactController::class, 'destroy'])->name('contact.destroy');
});
