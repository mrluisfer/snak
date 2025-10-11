import { Button } from '@/components/ui/button';
import { useFetchFoods } from '@/hooks/use-fetch-foods';
import { RefreshCcw } from 'lucide-react';
import { FoodCard, FoodCardSkeleton } from './food-item';

export const Foods = () => {
    const { foods, isLoading, refetch } = useFetchFoods(); // si tu hook no expone refetch, quítalo

    return (
        <section className="mt-10">
            <header className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">
                        Agregar comida a tu carrito
                    </h2>
                    {!isLoading && (
                        <p className="text-sm text-muted-foreground">
                            {foods.length} opciones disponibles
                        </p>
                    )}
                </div>

                <Button variant="outline" size="sm" onClick={() => refetch?.()}>
                    <RefreshCcw className="size-4" />
                    <span className="ml-2">Actualizar</span>
                </Button>
            </header>

            {isLoading ? (
                <ul
                    aria-busy="true"
                    className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4"
                >
                    {Array.from({ length: 8 }).map((_, i) => (
                        <li key={i}>
                            <FoodCardSkeleton />
                        </li>
                    ))}
                </ul>
            ) : foods.length ? (
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
                    {foods.map((food) => (
                        <li key={food.id}>
                            <FoodCard food={food} />
                        </li>
                    ))}
                </ul>
            ) : (
                <EmptyState onRetry={() => refetch?.()} />
            )}
        </section>
    );
};

const EmptyState = ({ onRetry }: { onRetry?: () => void }) => (
    <div className="mx-auto max-w-md rounded-lg border bg-card p-8 text-center">
        <h3 className="text-lg font-medium">No hay comida disponible</h3>
        <p className="mt-1 text-muted-foreground">
            Vuelve más tarde o intenta actualizar la lista.
        </p>
        <Button className="mt-4" onClick={onRetry}>
            Reintentar
        </Button>
    </div>
);
