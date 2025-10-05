import { Loader } from '@/components/ui/shadcn-io/ai/loader';
import { useFetchFoods } from '@/hooks/use-fetch-foods';
import { FoodItem } from './food-item';

export const Foods = () => {
    const { foods, isLoading } = useFetchFoods();

    if (isLoading) {
        return (
            <div>
                <Loader size={24} />
            </div>
        );
    }

    return (
        <section className="mt-10">
            <p className="mb-4">Agregar comida a tu carrito</p>
            {foods.length ? (
                <div className="flex flex-wrap items-start justify-between gap-4">
                    {foods.map((food) => (
                        <div key={food.id}>
                            <FoodItem food={food} />
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <p>No foods available at the moment.</p>
                </div>
            )}
        </section>
    );
};
