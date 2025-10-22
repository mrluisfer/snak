'use client';

import { authClient } from '@/lib/auth-client';
import { LogInIcon, LucideIcon, PencilLineIcon } from 'lucide-react';
import Link from 'next/link';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { Spinner } from '../ui/spinner';

type AuthItem = {
    title: string;
    url: string;
    icon: LucideIcon;
}[];

const items: AuthItem = [
    {
        title: 'Login',
        url: '/auth/login',
        icon: LogInIcon,
    },
    {
        title: 'Register',
        url: '/auth/register',
        icon: PencilLineIcon,
    },
];

export const NavAuth = () => {
    const { data, error, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <div>
                <Spinner />
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-1 text-red-500">
                <LogInIcon />
                <p>Error loading auth links</p>
            </div>
        );
    }

    if (data) {
        return null; // If user is logged in, don't show auth links
    }

    return (
        <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                        asChild
                        size="sm"
                        className="group/auth-item"
                    >
                        <Link href={item.url}>
                            <item.icon className="group-hover/auth-item:text-primary transition" />
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
};
