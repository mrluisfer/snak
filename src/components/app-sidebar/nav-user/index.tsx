'use client';

import {
    BadgeCheck,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
    UserIcon,
    UserXIcon,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useMemo } from 'react';
import { Spinner } from '../../ui/spinner';
import { LogOutDialog } from './log-out-dialog';

export function NavUser() {
    const { isMobile } = useSidebar();

    const { data, isPending, error } = authClient.useSession();

    const userImage = useMemo(() => {
        if (data?.user.image) {
            return data.user.image;
        }
        return '/default-user-profile.png';
    }, [data?.user.image]);

    if (isPending) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" disabled>
                        <Spinner />
                        Loading...
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    if (error) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" disabled>
                        <UserXIcon />
                        Error loading user
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    if (!data) {
        return (
            <SidebarMenuButton asChild>
                <Link href={'/auth/login'}>
                    <UserIcon className="text-primary mr-2" />
                    Log in into your account
                </Link>
            </SidebarMenuButton>
        );
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src={userImage}
                                    alt={data?.user.name || 'User'}
                                />
                                <AvatarFallback className="rounded-lg">
                                    CN
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">
                                    {data?.user.name}
                                </span>
                                <span className="truncate text-xs">
                                    {data?.user.email}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={userImage}
                                        alt={data?.user.name || 'User'}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        CN
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        {data?.user.name}
                                    </span>
                                    <span className="truncate text-xs">
                                        {data?.user.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="group">
                                <Sparkles className="transition-colors group-hover:text-yellow-400" />
                                Upgrade to Pro
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="group" asChild>
                                <Link href={'/settings/account'}>
                                    <BadgeCheck className="transition-colors group-hover:text-blue-400" />
                                    Account
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="group" asChild>
                                <Link href={'/settings/billing'}>
                                    <CreditCard className="transition-colors group-hover:text-green-400" />
                                    Billing
                                </Link>
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem className="group">
                                <Bell className="group-hover:text-primary transition-colors" />
                                Notifications
                            </DropdownMenuItem> */}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <LogOutDialog>
                            <DropdownMenuItem
                                className="group"
                                onSelect={(e) => e.preventDefault()}
                            >
                                <LogOut className="transition-colors group-hover:text-red-400" />
                                Log out
                            </DropdownMenuItem>
                        </LogOutDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
