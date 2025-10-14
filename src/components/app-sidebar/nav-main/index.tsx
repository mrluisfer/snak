'use client';

import {
    BugIcon,
    Building2Icon,
    ChevronRight,
    FactoryIcon,
} from 'lucide-react';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Spinner } from '@/components/ui/spinner';
import { Business } from '@/generated/prisma';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import useSWR from 'swr';
import { NavList } from './nav-list';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export function BusinessList() {
    const { data: session } = authClient.useSession();
    const { data, error, isLoading } = useSWR(
        `/api/business?userId=${session?.user?.id}`,
        fetcher,
    );

    const pathname = usePathname();

    const businesses = useMemo(() => {
        if (data && Array.isArray(data.businesses)) {
            return data.businesses as Business[];
        }
        return [];
    }, [data]);

    if (isLoading) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton type="button" disabled>
                        <Spinner />
                        <span>Loading...</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    if (error) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton type="button" disabled>
                        <BugIcon className="text-red-400" />
                        <span>Failed to load Business</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        );
    }

    if (!session) {
        // return (
        //     <SidebarMenu>
        //         <SidebarMenuItem>
        //             <SidebarMenuButton type="button" asChild>
        //                 <Link href={'/auth/login'}>
        //                     <FactoryIcon className="text-primary" />
        //                     <span>Log in to view your businesses</span>
        //                 </Link>
        //             </SidebarMenuButton>
        //         </SidebarMenuItem>
        //     </SidebarMenu>
        // );
        return null;
    }

    return (
        <SidebarMenu>
            <Collapsible
                key={'businesses'}
                asChild
                defaultOpen={pathname.startsWith('/business')}
            >
                <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        tooltip={'Businesses'}
                        isActive={'/business' === pathname}
                    >
                        <Link href={'/business'}>
                            <FactoryIcon />
                            <span>Business</span>
                        </Link>
                    </SidebarMenuButton>
                    {businesses?.length ? (
                        <>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuAction className="data-[state=open]:rotate-90">
                                    <ChevronRight />
                                    <span className="sr-only">Toggle</span>
                                </SidebarMenuAction>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    <SidebarMenuSubItem className="group/new-business">
                                        <SidebarMenuSubButton
                                            asChild
                                            isActive={
                                                pathname === '/business/new'
                                            }
                                        >
                                            <Link href={'/business/new'}>
                                                <Building2Icon
                                                    className={cn(
                                                        'transition-all group-hover/new-business:text-blue-400',
                                                        pathname ===
                                                            '/business/new'
                                                            ? '!important text-blue-400'
                                                            : '',
                                                    )}
                                                />
                                                <span>Create new business</span>
                                            </Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                </SidebarMenuSub>
                                <NavList businesses={businesses} />
                            </CollapsibleContent>
                        </>
                    ) : null}
                </SidebarMenuItem>
            </Collapsible>
        </SidebarMenu>
    );
}
