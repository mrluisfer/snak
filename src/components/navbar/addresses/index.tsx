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
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';
import { BugIcon, MapPinHouseIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { AddNewAddress } from './add-new-address';
import { ListAllAddresses } from './list-all-addresses';

export const Addresses = () => {
    const { data, error, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <div className="bg-accent flex items-center justify-center gap-2 rounded-lg p-1">
                <Spinner />
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center gap-2 rounded-lg bg-red-500/10 p-1 text-red-500">
                <BugIcon />
                <p>Error loading addresses</p>
            </div>
        );
    }

    if (!data) {
        return (
            <Button asChild variant={'outline'} size={'sm'}>
                <Link href={'/auth/login'}>
                    <UserIcon className="text-primary" />
                    <p>Log in to manage your addresses.</p>
                </Link>
            </Button>
        );
    }

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
