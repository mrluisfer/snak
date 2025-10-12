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
import { AddNewAddress } from './add-new-address';
import { ListAllAddresses } from './list-all-addresses';

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
                <AddNewAddress />
                <ListAllAddresses />
            </DialogContent>
        </Dialog>
    );
};
