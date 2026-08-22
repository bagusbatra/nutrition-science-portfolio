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
        Schema::create('section_visibilities', function (Blueprint $table) {
            $table->id();
            $table->boolean('skripsi')->default(true);
            $table->boolean('workbench')->default(true);
            $table->boolean('cases')->default(true);
            $table->boolean('rotations')->default(true);
            $table->boolean('media')->default(true);
            $table->boolean('skills')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('section_visibilities');
    }
};
