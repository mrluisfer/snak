'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';

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
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { NavList } from './nav-list';

// {
//     items,
// }: {
//     items: {
//         title: string;
//         url: string;
//         icon: LucideIcon;
//         isActive?: boolean;
//         items?: {
//             title: string;
//             url: string;
//         }[];
//     }[];
// }

// const fetcher = (url: string) => fetch(url).then((res) => res.json());
export function BusinessList({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    }[];
}) {
    // const [items, Items] = useState([]);
    //   const { data, error, isLoading } = useSWR('/api/business?userId', fetcher);

    // if(isLoading) return <div>Loading...</div>;
    // if(error) return <div>Failed to load</div>;

    return (
        <SidebarMenu>
            {items.map((item) => (
                <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive}
                >
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip={item.title}>
                            <Link href={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                        {item.items?.length ? (
                            <>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                                        <ChevronRight />
                                        <span className="sr-only">Toggle</span>
                                    </SidebarMenuAction>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <NavList items={item.items} />
                                </CollapsibleContent>
                            </>
                        ) : null}
                    </SidebarMenuItem>
                </Collapsible>
            ))}
        </SidebarMenu>
    );
}
