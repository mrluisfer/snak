import {
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Business } from '@/generated/prisma';
import { BoxIcon } from 'lucide-react';
import Link from 'next/link';

export const NavList = ({ businesses }: { businesses?: Array<Business> }) => {
    return (
        <SidebarMenuSub>
            {businesses?.map((business) => (
                <SidebarMenuSubItem
                    key={business.name}
                    className={`group/business-item`}
                >
                    <SidebarMenuSubButton asChild>
                        <Link href={`/business/${business.id}`}>
                            <BoxIcon
                                className={`group-hover/business-item:text-primary transition-all`}
                            />
                            <span>{business.name}</span>
                        </Link>
                    </SidebarMenuSubButton>
                </SidebarMenuSubItem>
            ))}
        </SidebarMenuSub>
    );
};
