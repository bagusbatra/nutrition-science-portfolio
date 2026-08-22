<?php

namespace Tests\Feature;

use Database\Seeders\PortfolioSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    /**
     * The public portfolio page renders successfully once seeded.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $this->seed(PortfolioSeeder::class);

        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
