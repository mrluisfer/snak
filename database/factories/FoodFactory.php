<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Food;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Food>
 */
class FoodFactory extends Factory
{
    protected $model = Food::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                'Pizza Margherita',
                'Hamburguesa Clasica',
                'Sushi Roll',
                'Ensalada Cesar',
                'Pasta Alfredo',
                'Tacos al Pastor',
            ]),
            'description' => $this->faker->sentence(12), // breve descripción
            'price' => $this->faker->randomFloat(2, 3, 50), // entre 3.00 y 50.00
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
