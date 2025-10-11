'use client'

import { cartDrawerAtom } from '@/atoms';
import { useCartContext } from '@/hooks/use-cart-context';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';

export const ClearCart = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { clear } = useCartContext();
    const setIsCartDrawerOpen = useSetAtom(cartDrawerAtom);

    const handleClearCart = async () => {
        clear();
        setIsOpen(false);
        setIsCartDrawerOpen(false);
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button variant={'ghost'} size={'sm'}>
                    Clear all items
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to clear the cart?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearCart}>
                        Yes, clear it
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
