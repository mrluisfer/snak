import {
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

export const NavList = ({
    items,
}: {
    items?: Array<{
        title: string;
        url: string;
    }>;
}) => {
    return (
        <SidebarMenuSub>
            {items?.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton asChild>
                        <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                        </Link>
                    </SidebarMenuSubButton>
                </SidebarMenuSubItem>
            ))}
        </SidebarMenuSub>
    );
};
