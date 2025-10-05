import { useCartContext } from '@/hooks/use-cart-context';
import type { ApiFood } from '@/types/api/api-types';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

export const FoodItem = ({ food }: { food: ApiFood }) => {
    const { addItem } = useCartContext();

    const handleAddToCart = (foodAdded: ApiFood) => {
        toast.info(`Added ${foodAdded.name} to cart!`, {
            position: 'top-center',
        });
        addItem(foodAdded);
    };

    return (
        <Card className="w-72">
            <CardHeader>
                <h2 className="flex items-center justify-start gap-1 text-lg font-medium">
                    {food.name}
                </h2>
            </CardHeader>
            <CardContent>
                <p>{food.description}</p>
            </CardContent>
            <CardFooter>
                <Button onClick={() => handleAddToCart(food)}>
                    Add to Cart - ${food.price}
                </Button>
            </CardFooter>
        </Card>
    );
};
