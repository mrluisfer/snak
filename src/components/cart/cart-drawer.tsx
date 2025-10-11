'use client';

import { useCartContext } from '@/hooks/use-cart-context';
import { ShoppingCart, XIcon } from 'lucide-react';

import { cartDrawerAtom } from '@/atoms';
import { useAtom } from 'jotai';
import { Badge } from '../ui/badge';
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
import { ClearCart } from './clear-cart';

export const CartDrawer = () => {
    const [isOpen, setIsOpen] = useAtom(cartDrawerAtom);

    const { cart } = useCartContext();

    return (
        <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <Button variant={'default'} size={'icon'} className="relative">
                    {!cart.length ? null : (
                        <Badge className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2">
                            {cart.length}
                        </Badge>
                    )}
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

                {!cart.length ? null : (
                    <div className="flex justify-end gap-4">
                        <ClearCart />
                    </div>
                )}

                {cart.map((item) => (
                    <div key={item.id} className="border-b p-4">
                        <div className="flex justify-between">
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-muted-foreground text-sm">
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
