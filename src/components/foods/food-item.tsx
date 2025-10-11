import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCartContext } from '@/hooks/use-cart-context';
import { cn } from '@/lib/utils';
import type { ApiFood } from '@/types/api/api-types';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

export const FoodCard = ({ food }: { food: ApiFood }) => {
    const { addItem } = useCartContext();

    const handleAdd = () => {
        toast.info(`Añadido ${food.name} al carrito`, {
            position: 'top-center',
        });
        addItem(food);
    };

    const hasImage = Boolean((food as any).imageUrl);

    return (
        <Card
            className={cn(
                'group h-full overflow-hidden transition',
                'hover:-translate-y-0.5 hover:shadow-lg',
            )}
        >
            {/* Imagen opcional */}
            {hasImage ? (
                <div className="p-4 pt-4">
                    <AspectRatio
                        ratio={16 / 9}
                        className="overflow-hidden rounded-md"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={(food as any).imageUrl}
                            alt={food.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            loading="lazy"
                        />
                    </AspectRatio>
                </div>
            ) : null}

            <CardHeader className="pt-4">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base leading-tight font-medium">
                        {food.name}
                    </h3>
                    <Badge variant="secondary">
                        {formatCurrency(food.price)}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                    {food.description}
                </p>
            </CardContent>

            <CardFooter className="mt-auto">
                <Button className="w-full" onClick={handleAdd}>
                    <ShoppingCart className="mr-2 size-4" />
                    Agregar al carrito
                </Button>
            </CardFooter>
        </Card>
    );
};

export const FoodCardSkeleton = () => (
    <Card className="h-full">
        <div className="p-4">
            <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md">
                <Skeleton className="h-full w-full" />
            </AspectRatio>
        </div>
        <CardHeader className="pt-4">
            <Skeleton className="h-5 w-3/5" />
        </CardHeader>
        <CardContent>
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
        </CardContent>
        <CardFooter>
            <Skeleton className="h-9 w-full" />
        </CardFooter>
    </Card>
);

// utils
const formatCurrency = (n: number) =>
    new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'USD',
    }).format(n);
