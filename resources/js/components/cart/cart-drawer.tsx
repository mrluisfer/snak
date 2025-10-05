import { useCartContext } from '@/hooks/use-cart-context';
import { ShoppingCart, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '../ui/drawer';

export const CartDrawer = () => {
    const { cart } = useCartContext();

    return (
        <Drawer direction="right">
            <DrawerTrigger asChild>
                <Button variant={'ghost'} size={'icon'} className="relative">
                    <ShoppingCart />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <div className="flex flex-1 items-center justify-between">
                        <DrawerTitle>Your Cart</DrawerTitle>
                        <DrawerClose asChild>
                            <XIcon className="size-5" />
                        </DrawerClose>
                    </div>
                    <DrawerDescription>
                        {cart.length === 0
                            ? ' Your cart is empty.'
                            : ` You have ${cart.length} item(s) in your cart.`}
                    </DrawerDescription>
                </DrawerHeader>

                {cart.map((item) => (
                    <div key={item.id} className="border-b p-4">
                        <div className="flex justify-between">
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    Quantity: {item.quantity ?? 1}
                                </p>
                            </div>
                            <div>
                                <p className="font-medium">${item.price}</p>
                            </div>
                        </div>
                    </div>
                ))}

                <DrawerFooter>
                    <Button variant={'default'} disabled={cart.length === 0}>
                        Checkout
                    </Button>
                    <DrawerClose asChild>
                        <Button variant={'link'} className="mx-auto w-fit">
                            Keep Shopping
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
