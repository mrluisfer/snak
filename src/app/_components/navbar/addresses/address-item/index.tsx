'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisIcon, MapPinIcon, MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { EditAddress } from '../edit-address';
import { DeleteAddressItem } from './delete-address-item';
import { EditAddressItem } from './edit-address-item';

type AddressItemProps = {
    addr: {
        id: string;
        address: string;
        userId?: string;
        createdAt?: string;
        updatedAt?: string;
    };
};
export const AddressItem = ({ addr }: AddressItemProps) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <DropdownMenu>
            <li
                key={addr.id}
                className="hover:bg-accent rounded-4xl group flex cursor-pointer items-center justify-between gap-2 p-2 transition-all hover:rounded-lg"
            >
                {isEditing ? (
                    <EditAddress address={addr} setIsEditing={setIsEditing} />
                ) : (
                    <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                            <MapPinIcon className="group-hover:text-primary size-4" />
                            {addr.address}
                        </div>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'outline'} size={'icon-sm'}>
                                <EllipsisIcon />
                            </Button>
                        </DropdownMenuTrigger>
                    </div>
                )}
            </li>
            <DropdownMenuContent>
                <DropdownMenuLabel className="flex items-center gap-2">
                    <MenuIcon className="size-4" />
                    Options
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <EditAddressItem setIsEditing={setIsEditing} />
                <DeleteAddressItem id={addr?.id} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
