'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { MapPinHouseIcon } from 'lucide-react';

export const Addresses = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'default'} size={'icon'} className="relative">
                    <MapPinHouseIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Manage your Addresses</DialogTitle>
                    <DialogDescription>
                        You can add, edit, or remove your saved addresses here.
                        These addresses will be used for delivery and billing
                        purposes.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
