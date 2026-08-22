<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('media_infographics', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category');
            $table->string('target_audience');
            $table->text('description');
            $table->json('key_points')->nullable();
            $table->string('thumbnail_bg');
            $table->string('accent_color');
            $table->string('dimensions');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_infographics');
    }
};
